/**
 * VirtualLab.jsx
 *
 * Virtual Experiment Simulator section for LabGenie AI.
 * Self-contained: all styles are inlined using the project's CSS variables.
 *
 * K-Means Clustering  — fully interactive client-side simulation.
 * Binary Search       — fully interactive client-side simulation.
 */

import { useState, useCallback, useRef } from "react";

// ─── K-Means helpers ──────────────────────────────────────────────────────────

/** Fixed, reproducible 2-D dataset (30 points in three natural groups). */
const FIXED_POINTS = [
  // Group A — top-left
  { x: 0.12, y: 0.80 }, { x: 0.18, y: 0.72 }, { x: 0.22, y: 0.85 },
  { x: 0.08, y: 0.65 }, { x: 0.25, y: 0.78 }, { x: 0.15, y: 0.90 },
  { x: 0.30, y: 0.70 }, { x: 0.10, y: 0.75 }, { x: 0.20, y: 0.60 },
  { x: 0.28, y: 0.88 },
  // Group B — bottom-centre
  { x: 0.45, y: 0.20 }, { x: 0.52, y: 0.15 }, { x: 0.48, y: 0.30 },
  { x: 0.55, y: 0.25 }, { x: 0.42, y: 0.10 }, { x: 0.60, y: 0.18 },
  { x: 0.50, y: 0.35 }, { x: 0.38, y: 0.22 }, { x: 0.58, y: 0.32 },
  { x: 0.44, y: 0.08 },
  // Group C — right
  { x: 0.80, y: 0.55 }, { x: 0.88, y: 0.48 }, { x: 0.75, y: 0.62 },
  { x: 0.92, y: 0.70 }, { x: 0.85, y: 0.40 }, { x: 0.78, y: 0.72 },
  { x: 0.95, y: 0.58 }, { x: 0.70, y: 0.50 }, { x: 0.82, y: 0.65 },
  { x: 0.90, y: 0.45 },
];

/** Distinct palette for up to 4 clusters. */
const CLUSTER_COLORS = ["#1a56db", "#16a34a", "#d97706", "#9333ea"];
const CENTROID_STROKE = ["#1040a8", "#0f7730", "#b45309", "#6b21a8"];

/** Euclidean distance squared. */
function dist2(a, b) {
  return (a.x - b.x) ** 2 + (a.y - b.y) ** 2;
}

/** Assign each point to the nearest centroid; return array of cluster indices. */
function assignClusters(points, centroids) {
  return points.map((p) => {
    let best = 0;
    let bestD = Infinity;
    centroids.forEach((c, i) => {
      const d = dist2(p, c);
      if (d < bestD) { bestD = d; best = i; }
    });
    return best;
  });
}

/** Recalculate centroids as the mean of each cluster's points. */
function recalcCentroids(points, assignments, k) {
  return Array.from({ length: k }, (_, ci) => {
    const members = points.filter((_, i) => assignments[i] === ci);
    if (members.length === 0) return { x: Math.random(), y: Math.random() };
    return {
      x: members.reduce((s, p) => s + p.x, 0) / members.length,
      y: members.reduce((s, p) => s + p.y, 0) / members.length,
    };
  });
}

/** Check if two centroid arrays are equal (within a tolerance). */
function centroidsEqual(a, b, tol = 1e-6) {
  return a.every((c, i) => dist2(c, b[i]) < tol);
}

/** Deterministic initial centroids — spread evenly from the fixed dataset. */
function initialCentroids(k) {
  const step = Math.floor(FIXED_POINTS.length / k);
  return Array.from({ length: k }, (_, i) => ({ ...FIXED_POINTS[i * step] }));
}

/** Build a fresh simulation state for the given k. */
function buildInitialState(k) {
  const centroids = initialCentroids(k);
  const assignments = assignClusters(FIXED_POINTS, centroids);
  return {
    k,
    centroids,
    assignments,
    iteration: 0,
    phase: "assigned",   // "assigned" | "updated" | "converged"
    converged: false,
  };
}

// ─── Phase explanation helper ─────────────────────────────────────────────────

function phaseLabel(phase, iteration) {
  if (phase === "converged") return "✅ Converged! Centroids are stable — the algorithm has finished.";
  if (iteration === 0)       return "🔵 Initial centroids placed. Each point assigned to its nearest centroid.";
  if (phase === "assigned")  return "📍 Points are assigned to the nearest centroid.";
  return "📐 Centroids are being updated to the mean of their assigned points.";
}

// ─── SVG canvas ───────────────────────────────────────────────────────────────

const SVG_W = 500;
const SVG_H = 360;
const PAD   = 28;

/** Map a unit [0,1] coordinate to SVG space. */
function toSvg(v, dim) {
  const range = dim - PAD * 2;
  return PAD + v * range;
}

function KMeansCanvas({ points, assignments, centroids, clusterColors }) {
  return (
    <svg
      viewBox={`0 0 ${SVG_W} ${SVG_H}`}
      style={{ width: "100%", height: "auto", display: "block",
               border: "1px solid #e2e8f0", borderRadius: "8px",
               background: "#f8fafc" }}
      aria-label="K-Means clustering visualisation"
    >
      {/* Grid lines */}
      {[0.2, 0.4, 0.6, 0.8].map((v) => (
        <g key={v}>
          <line
            x1={toSvg(v, SVG_W)} y1={PAD}
            x2={toSvg(v, SVG_W)} y2={SVG_H - PAD}
            stroke="#e2e8f0" strokeWidth={1}
          />
          <line
            x1={PAD} y1={toSvg(1 - v, SVG_H)}
            x2={SVG_W - PAD} y2={toSvg(1 - v, SVG_H)}
            stroke="#e2e8f0" strokeWidth={1}
          />
        </g>
      ))}

      {/* Axes */}
      <line x1={PAD} y1={SVG_H - PAD} x2={SVG_W - PAD} y2={SVG_H - PAD}
            stroke="#94a3b8" strokeWidth={1.5} />
      <line x1={PAD} y1={PAD} x2={PAD} y2={SVG_H - PAD}
            stroke="#94a3b8" strokeWidth={1.5} />

      {/* Lines from each point to its centroid */}
      {points.map((p, i) => {
        const c = centroids[assignments[i]];
        return (
          <line key={`line-${i}`}
            x1={toSvg(p.x, SVG_W)} y1={toSvg(1 - p.y, SVG_H)}
            x2={toSvg(c.x, SVG_W)} y2={toSvg(1 - c.y, SVG_H)}
            stroke={clusterColors[assignments[i]]}
            strokeWidth={0.8} strokeOpacity={0.25}
          />
        );
      })}

      {/* Data points */}
      {points.map((p, i) => (
        <circle key={`pt-${i}`}
          cx={toSvg(p.x, SVG_W)} cy={toSvg(1 - p.y, SVG_H)}
          r={5}
          fill={clusterColors[assignments[i]]}
          fillOpacity={0.82}
          stroke="#fff" strokeWidth={1}
        />
      ))}

      {/* Centroids — diamond shape */}
      {centroids.map((c, ci) => {
        const cx = toSvg(c.x, SVG_W);
        const cy = toSvg(1 - c.y, SVG_H);
        const r  = 9;
        const pts = `${cx},${cy - r} ${cx + r},${cy} ${cx},${cy + r} ${cx - r},${cy}`;
        return (
          <g key={`cen-${ci}`}>
            <polygon points={pts}
              fill={clusterColors[ci]}
              stroke={CENTROID_STROKE[ci]}
              strokeWidth={2}
            />
            <text x={cx} y={cy - r - 4}
              textAnchor="middle" fontSize={10} fontWeight={700}
              fill={CENTROID_STROKE[ci]}
            >
              C{ci + 1}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

// ─── K-Means simulator panel ──────────────────────────────────────────────────

function KMeansSimulator({ onClose }) {
  const [sim, setSim] = useState(() => buildInitialState(3));
  const autoRef = useRef(null);
  const [running, setRunning] = useState(false);

  /** Advance one step: assign → update → check convergence. */
  const step = useCallback((current) => {
    if (current.converged) return current;

    if (current.phase === "assigned") {
      // Update centroids
      const newCentroids = recalcCentroids(FIXED_POINTS, current.assignments, current.k);
      const converged = centroidsEqual(newCentroids, current.centroids);
      return {
        ...current,
        centroids: newCentroids,
        iteration: current.iteration + 1,
        phase: converged ? "converged" : "updated",
        converged,
      };
    }

    // phase === "updated" → reassign points
    const newAssignments = assignClusters(FIXED_POINTS, current.centroids);
    return { ...current, assignments: newAssignments, phase: "assigned" };
  }, []);

  function handleNext() {
    setSim((prev) => step(prev));
  }

  function handleRun() {
    if (running) {
      clearInterval(autoRef.current);
      setRunning(false);
      return;
    }
    setRunning(true);
    autoRef.current = setInterval(() => {
      setSim((prev) => {
        const next = step(prev);
        if (next.converged) {
          clearInterval(autoRef.current);
          setRunning(false);
        }
        return next;
      });
    }, 700);
  }

  function handleReset() {
    clearInterval(autoRef.current);
    setRunning(false);
    setSim(buildInitialState(sim.k));
  }

  function handleKChange(newK) {
    clearInterval(autoRef.current);
    setRunning(false);
    setSim(buildInitialState(newK));
  }

  // Cluster sizes
  const clusterSizes = Array.from({ length: sim.k }, (_, ci) =>
    sim.assignments.filter((a) => a === ci).length
  );

  const colors = CLUSTER_COLORS.slice(0, sim.k);

  return (
    <div style={s.simPanel}>
      {/* ── Header ── */}
      <div style={s.simHeader}>
        <div>
          <h3 style={s.simTitle}>🔵 K-Means Clustering Simulator</h3>
          <p style={s.simSubtitle}>
            Watch how K-Means iteratively groups data points into clusters.
          </p>
        </div>
        <button style={s.btnClose} onClick={onClose} title="Close simulator">✕</button>
      </div>

      {/* ── Controls ── */}
      <div className="vlab-controls">
        {/* K selector */}
        <div style={s.controlGroup}>
          <span style={s.controlLabel}>Number of clusters (K)</span>
          <div style={s.kBtnRow}>
            {[2, 3, 4].map((kv) => (
              <button
                key={kv}
                style={{ ...s.kBtn, ...(sim.k === kv ? s.kBtnActive : {}) }}
                onClick={() => handleKChange(kv)}
              >
                K = {kv}
              </button>
            ))}
          </div>
        </div>

        {/* Action buttons */}
        <div style={s.actionRow}>
          <button
            style={{ ...s.btnAction, ...(sim.converged ? s.btnDisabled : {}) }}
            onClick={handleNext}
            disabled={sim.converged || running}
          >
            ⏭ Next Iteration
          </button>
          <button
            style={{ ...s.btnAction, ...(running ? s.btnRunning : {}),
                     ...(sim.converged ? s.btnDisabled : {}) }}
            onClick={handleRun}
            disabled={sim.converged}
          >
            {running ? "⏸ Pause" : "▶ Run Simulation"}
          </button>
          <button style={{ ...s.btnAction, ...s.btnSecondary }} onClick={handleReset}>
            ↺ Reset
          </button>
        </div>
      </div>

      {/* ── Phase explanation banner ── */}
      <div style={{
        ...s.phaseBanner,
        ...(sim.converged ? s.phaseBannerConverged : {}),
      }}>
        {phaseLabel(sim.phase, sim.iteration)}
      </div>

      {/* ── Canvas ── */}
      <KMeansCanvas
        points={FIXED_POINTS}
        assignments={sim.assignments}
        centroids={sim.centroids}
        clusterColors={colors}
      />

      {/* ── Stats ── */}
      <div style={s.statsRow}>
        <div style={s.statBox}>
          <span style={s.statLabel}>Iteration</span>
          <span style={s.statValue}>{sim.iteration}</span>
        </div>
        <div style={s.statBox}>
          <span style={s.statLabel}>Data Points</span>
          <span style={s.statValue}>{FIXED_POINTS.length}</span>
        </div>
        {clusterSizes.map((sz, ci) => (
          <div key={ci} style={{ ...s.statBox, borderLeft: `3px solid ${colors[ci]}` }}>
            <span style={s.statLabel}>Cluster {ci + 1}</span>
            <span style={{ ...s.statValue, color: colors[ci] }}>{sz} pts</span>
          </div>
        ))}
      </div>

      {/* ── Legend ── */}
      <div style={s.legend}>
        {colors.map((col, ci) => (
          <span key={ci} style={s.legendItem}>
            <svg width={14} height={14} viewBox="0 0 14 14" style={{ flexShrink: 0 }}>
              <polygon points="7,0 14,7 7,14 0,7" fill={col} />
            </svg>
            Centroid {ci + 1}
            <span style={{ ...s.legendDot, background: col }} />
            Cluster {ci + 1}
          </span>
        ))}
      </div>
    </div>
  );
}

// ─── Binary Search helpers ────────────────────────────────────────────────────

const BS_ARRAY = [3, 7, 12, 18, 24, 31, 42, 55, 68, 79, 91];

/**
 * Build initial Binary Search state for a given target.
 * status: "searching" | "found" | "not-found"
 */
function buildBSState(target) {
  return {
    target,
    low: 0,
    high: BS_ARRAY.length - 1,
    mid: null,
    comparisons: 0,
    status: "searching",
    explanation: `Starting search for target ${target}. Search space: indices 0 – ${BS_ARRAY.length - 1}.`,
  };
}

/**
 * Advance Binary Search by one comparison.
 * Returns a new state object (never mutates).
 */
function bsStep(state) {
  const { low, high, target, comparisons } = state;

  if (low > high) {
    return {
      ...state,
      mid: null,
      status: "not-found",
      explanation: `Search space is empty (low ${low} > high ${high}). ${target} is not in the array.`,
    };
  }

  const mid = Math.floor((low + high) / 2);
  const midVal = BS_ARRAY[mid];
  const newComparisons = comparisons + 1;

  if (midVal === target) {
    return {
      ...state, mid, comparisons: newComparisons,
      status: "found",
      explanation: `✅ Found! arr[${mid}] = ${midVal} equals target ${target}. Search complete in ${newComparisons} comparison${newComparisons !== 1 ? "s" : ""}.`,
    };
  }

  if (midVal < target) {
    return {
      ...state, mid, comparisons: newComparisons,
      low: mid + 1,
      status: "searching",
      explanation: `arr[${mid}] = ${midVal} < target ${target}. Discard left half → search right: indices ${mid + 1} – ${high}.`,
    };
  }

  return {
    ...state, mid, comparisons: newComparisons,
    high: mid - 1,
    status: "searching",
    explanation: `arr[${mid}] = ${midVal} > target ${target}. Discard right half → search left: indices ${low} – ${mid - 1}.`,
  };
}

// ─── Binary Search simulator panel ───────────────────────────────────────────

const BS_TARGETS = BS_ARRAY.concat([5, 99]); // includes values not in array

function BinarySearchSimulator({ onClose }) {
  const [target, setTarget] = useState(42);
  const [sim, setSim] = useState(() => buildBSState(42));
  const autoRef = useRef(null);
  const [running, setRunning] = useState(false);

  const isDone = sim.status === "found" || sim.status === "not-found";

  function handleStep() {
    setSim((prev) => bsStep(prev));
  }

  function handleRun() {
    if (running) {
      clearInterval(autoRef.current);
      setRunning(false);
      return;
    }
    setRunning(true);
    autoRef.current = setInterval(() => {
      setSim((prev) => {
        const next = bsStep(prev);
        if (next.status !== "searching") {
          clearInterval(autoRef.current);
          setRunning(false);
        }
        return next;
      });
    }, 800);
  }

  function handleReset() {
    clearInterval(autoRef.current);
    setRunning(false);
    setSim(buildBSState(target));
  }

  function handleTargetChange(val) {
    clearInterval(autoRef.current);
    setRunning(false);
    const t = Number(val);
    setTarget(t);
    setSim(buildBSState(t));
  }

  // Banner colours
  const bannerStyle = sim.status === "found"
    ? { ...s.phaseBanner, ...s.phaseBannerConverged }
    : sim.status === "not-found"
      ? { ...s.phaseBanner, background: "#fef2f2", border: "1px solid #fecaca", color: "#b91c1c" }
      : s.phaseBanner;

  return (
    <div style={s.simPanel}>
      {/* ── Header ── */}
      <div style={s.simHeader}>
        <div>
          <h3 style={s.simTitle}>🔍 Binary Search Simulator</h3>
          <p style={s.simSubtitle}>
            Watch how Binary Search halves the search space with each comparison.
          </p>
        </div>
        <button style={s.btnClose} onClick={onClose} title="Close simulator">✕</button>
      </div>

      {/* ── Controls ── */}
      <div className="vlab-controls">
        {/* Target selector */}
        <div style={s.controlGroup}>
          <span style={s.controlLabel}>Target value</span>
          <div style={s.kBtnRow}>
            {BS_TARGETS.map((t) => (
              <button
                key={t}
                style={{ ...s.kBtn, ...(target === t ? s.kBtnActive : {}) }}
                onClick={() => handleTargetChange(t)}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* Action buttons */}
        <div style={s.actionRow}>
          <button
            style={{ ...s.btnAction, ...(isDone ? s.btnDisabled : {}) }}
            onClick={handleStep}
            disabled={isDone || running}
          >
            ⏭ Next Step
          </button>
          <button
            style={{ ...s.btnAction, ...(running ? s.btnRunning : {}), ...(isDone ? s.btnDisabled : {}) }}
            onClick={handleRun}
            disabled={isDone}
          >
            {running ? "⏸ Pause" : "▶ Run Simulation"}
          </button>
          <button style={{ ...s.btnAction, ...s.btnSecondary }} onClick={handleReset}>
            ↺ Reset
          </button>
        </div>
      </div>

      {/* ── Explanation banner ── */}
      <div style={bannerStyle}>{sim.explanation}</div>

      {/* ── Array visualisation ── */}
      <div style={bs.arrayWrapper}>
        {/* Index row */}
        <div style={bs.indexRow}>
          {BS_ARRAY.map((_, i) => (
            <div key={i} style={bs.indexCell}>{i}</div>
          ))}
        </div>

        {/* Value cells */}
        <div style={bs.cellRow}>
          {BS_ARRAY.map((val, i) => {
            const isLow  = i === sim.low  && sim.status === "searching";
            const isHigh = i === sim.high && sim.status === "searching";
            const isMid  = i === sim.mid;
            const isFound = isMid && sim.status === "found";
            const isEliminated =
              sim.status === "searching" && sim.mid !== null &&
              (i < sim.low || i > sim.high);

            let cellStyle = { ...bs.cell };
            if (isFound)      cellStyle = { ...bs.cell, ...bs.cellFound };
            else if (isMid)   cellStyle = { ...bs.cell, ...bs.cellMid };
            else if (isLow)   cellStyle = { ...bs.cell, ...bs.cellLow };
            else if (isHigh)  cellStyle = { ...bs.cell, ...bs.cellHigh };
            else if (isEliminated) cellStyle = { ...bs.cell, ...bs.cellElim };

            return (
              <div key={i} style={cellStyle}>
                {val}
                {/* Pointer labels */}
                {(isLow || isHigh || isMid) && (
                  <div style={bs.pointerRow}>
                    {isMid  && <span style={{ ...bs.pointer, ...bs.pointerMid  }}>mid</span>}
                    {isLow  && <span style={{ ...bs.pointer, ...bs.pointerLow  }}>low</span>}
                    {isHigh && <span style={{ ...bs.pointer, ...bs.pointerHigh }}>high</span>}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Stats ── */}
      <div style={s.statsRow}>
        <div style={s.statBox}>
          <span style={s.statLabel}>Comparisons</span>
          <span style={s.statValue}>{sim.comparisons}</span>
        </div>
        <div style={s.statBox}>
          <span style={s.statLabel}>Low index</span>
          <span style={{ ...s.statValue, color: "#16a34a" }}>
            {sim.status === "not-found" ? "—" : sim.low}
          </span>
        </div>
        <div style={s.statBox}>
          <span style={s.statLabel}>Mid index</span>
          <span style={{ ...s.statValue, color: "#d97706" }}>
            {sim.mid === null ? "—" : sim.mid}
          </span>
        </div>
        <div style={s.statBox}>
          <span style={s.statLabel}>High index</span>
          <span style={{ ...s.statValue, color: "#9333ea" }}>
            {sim.status === "not-found" ? "—" : sim.high}
          </span>
        </div>
        <div style={s.statBox}>
          <span style={s.statLabel}>Target</span>
          <span style={s.statValue}>{sim.target}</span>
        </div>
      </div>

      {/* ── Legend ── */}
      <div style={s.legend}>
        {[
          { color: "#d97706", bg: "#fffbeb", label: "mid" },
          { color: "#16a34a", bg: "#f0fdf4", label: "low" },
          { color: "#9333ea", bg: "#faf5ff", label: "high" },
          { color: "#1a56db", bg: "#eff4ff", label: "found" },
          { color: "#94a3b8", bg: "#f1f5f9", label: "eliminated" },
        ].map(({ color, bg, label }) => (
          <span key={label} style={s.legendItem}>
            <span style={{ ...bs.cell, ...bs.legendSwatch, background: bg,
              border: `2px solid ${color}`, color }} >
              n
            </span>
            {label}
          </span>
        ))}
      </div>
    </div>
  );
}

// ─── Experiment cards ─────────────────────────────────────────────────────────

function ExperimentCard({ experiment, onStart }) {
  return (
    <div style={styles.card}>
      <div style={styles.cardHeader}>
        <span style={styles.cardIcon}>{experiment.icon}</span>
        <div>
          <h3 style={styles.cardTitle}>{experiment.title}</h3>
          <div style={styles.tagRow}>
            {experiment.tags.map((tag) => (
              <span key={tag} style={styles.tag}>{tag}</span>
            ))}
          </div>
        </div>
      </div>

      <p style={styles.cardDescription}>{experiment.description}</p>

      <button
        style={styles.btnStart}
        onMouseEnter={(e) =>
          (e.currentTarget.style.background = "var(--color-primary-hover, #1347c0)")
        }
        onMouseLeave={(e) =>
          (e.currentTarget.style.background = "var(--color-primary, #1a56db)")
        }
        onClick={() => onStart && onStart(experiment.id)}
      >
        ▶ Start Experiment
      </button>
    </div>
  );
}

// ─── Root component ───────────────────────────────────────────────────────────

const EXPERIMENTS = [
  {
    id: "kmeans",
    icon: "🔵",
    title: "K-Means Clustering",
    description:
      "Interactively visualise how K-Means partitions a dataset into clusters. Watch centroids converge step by step.",
    tags: ["Machine Learning", "Unsupervised"],
  },
  {
    id: "binary-search",
    icon: "🔍",
    title: "Binary Search",
    description:
      "Step through the Binary Search algorithm on a sorted array. Observe how the search space halves with each comparison.",
    tags: ["Algorithms", "Searching"],
  },
];

function VirtualLab() {
  const [activeExp, setActiveExp] = useState(null);

  function handleStart(id) {
    setActiveExp(id);

    setTimeout(() => {
      document
        .getElementById("vlab-simulator")
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 50);
  }

  return (
    <section className="virtual-lab-workspace">
      {/* Workspace heading */}
      <div className="workspace-intro">
        <div>
          <div className="workspace-label virtual-label">
            <span className="workspace-dot" />
            INTERACTIVE LEARNING
          </div>

          <h2 className="workspace-title">
            Explore the Virtual Lab
          </h2>

          <p className="workspace-description">
            Learn algorithms by doing. Run interactive experiments, control
            each step, and see how the underlying logic works in real time.
          </p>
        </div>

        <div className="workspace-visual">
          🧪
        </div>
      </div>

      {/* Feature strip */}
      <div className="virtual-features">
        <div className="virtual-feature">
          <span className="virtual-feature-icon blue">▶</span>
          <div>
            <strong>Step-by-step</strong>
            <span>Control every iteration</span>
          </div>
        </div>

        <div className="virtual-feature">
          <span className="virtual-feature-icon teal">◉</span>
          <div>
            <strong>Visual learning</strong>
            <span>See algorithms in action</span>
          </div>
        </div>

        <div className="virtual-feature">
          <span className="virtual-feature-icon purple">✦</span>
          <div>
            <strong>Hands-on practice</strong>
            <span>No setup required</span>
          </div>
        </div>
      </div>

      {/* Experiment selection */}
      <div className="experiment-section">
        <div className="experiment-section-heading">
          <div>
            <p className="eyebrow">CHOOSE AN EXPERIMENT</p>
            <h3>What would you like to explore?</h3>
          </div>

          <span className="experiment-count">
            {EXPERIMENTS.length} experiments
          </span>
        </div>

        <div className="experiment-grid">
          {EXPERIMENTS.map((exp) => (
            <div
              key={exp.id}
              className={`experiment-card-wrapper ${
                activeExp === exp.id ? "selected" : ""
              }`}
            >
              <ExperimentCard
                experiment={exp}
                onStart={handleStart}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Active simulator */}
      {activeExp && (
        <div
          id="vlab-simulator"
          className="active-simulator"
        >
          <div className="simulator-context">
            <span className="simulator-status-dot" />
            LIVE EXPERIMENT
            <span className="simulator-context-separator">·</span>
            Interactive simulation
          </div>

          {activeExp === "kmeans" && (
            <KMeansSimulator
              onClose={() => setActiveExp(null)}
            />
          )}

          {activeExp === "binary-search" && (
            <BinarySearchSimulator
              onClose={() => setActiveExp(null)}
            />
          )}
        </div>
      )}

      {/* Empty state / coming soon */}
      {!activeExp && (
        <div className="virtual-empty-state">
          <div className="empty-icon">🧪</div>

          <div>
            <strong>Pick an experiment to get started</strong>
            <span>
              Select an experiment above and launch the interactive simulator.
            </span>
          </div>
        </div>
      )}

      <div className="coming-soon-card">
        <span>🚧</span>
        <div>
          <strong>More experiments coming soon</strong>
          <p>
            Additional algorithms and machine learning experiments will be
            added in future updates.
          </p>
        </div>
      </div>
    </section>
  );
}
// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = {
  description: {
    fontSize: "0.93rem",
    color: "var(--text-muted, #64748B)",
    marginBottom: "24px",
    lineHeight: 1.65,
    maxWidth: "620px",
  },

  cardGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "16px",
  },

  card: {
    background: "var(--surface, #FFFFFF)",
    border: "1px solid var(--border, #E2E8F0)",
    borderRadius: "16px",
    padding: "22px",
    boxShadow:
      "0 4px 14px rgba(15,23,42,0.05), 0 1px 3px rgba(15,23,42,0.04)",
    display: "flex",
    flexDirection: "column",
    gap: "14px",
    borderTop: "3px solid #CCFBF1",
    transition: "transform 0.18s ease, box-shadow 0.18s ease",
  },

  cardHeader: {
    display: "flex",
    alignItems: "flex-start",
    gap: "14px",
  },

  cardIcon: {
    width: "46px",
    height: "46px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "#F0FDFA",
    borderRadius: "12px",
    fontSize: "1.45rem",
    lineHeight: 1,
    flexShrink: 0,
  },

  cardTitle: {
    fontSize: "1.02rem",
    fontWeight: 750,
    color: "var(--text, #0F172A)",
    marginBottom: "6px",
  },

  tagRow: {
    display: "flex",
    gap: "6px",
    flexWrap: "wrap",
  },

  tag: {
    background: "#F0FDFA",
    color: "#0D9488",
    border: "1px solid #CCFBF1",
    fontSize: "0.68rem",
    fontWeight: 700,
    padding: "3px 9px",
    borderRadius: "999px",
  },

  cardDescription: {
    fontSize: "0.87rem",
    color: "var(--text-muted, #64748B)",
    lineHeight: 1.65,
    flexGrow: 1,
  },

  btnStart: {
    alignSelf: "flex-start",
    padding: "10px 18px",
    background:
      "linear-gradient(135deg, var(--teal, #0D9488), var(--blue, #2563EB))",
    color: "#fff",
    border: "none",
    borderRadius: "9px",
    fontSize: "0.84rem",
    fontWeight: 700,
    fontFamily: "inherit",
    cursor: "pointer",
    boxShadow: "0 3px 10px rgba(13,148,136,0.22)",
    transition: "opacity 0.15s",
  },

  comingSoon: {
    marginTop: "20px",
    fontSize: "0.81rem",
    color: "var(--text-subtle, #94A3B8)",
  },
};

// Simulator-specific styles
const s = {
  simPanel: {
    background: "var(--surface, #FFFFFF)",
    border: "1px solid var(--border, #E2E8F0)",
    borderRadius: "14px",
    padding: "24px",
    boxShadow: "0 4px 16px rgba(13,148,136,0.07), 0 2px 6px rgba(0,0,0,0.05)",
    borderTop: "2px solid var(--teal-mid, #CCFBF1)",
  },
  simHeader: {
    display: "flex", justifyContent: "space-between", alignItems: "flex-start",
    gap: "12px", marginBottom: "20px",
  },
  simTitle: {
    fontSize: "1.05rem", fontWeight: 700,
    color: "var(--text, #0F172A)", marginBottom: "4px",
  },
  simSubtitle: {
    fontSize: "0.85rem", color: "var(--text-muted, #64748B)", margin: 0,
  },
  btnClose: {
    background: "var(--surface-2, #F1F5F9)", border: "1px solid var(--border, #E2E8F0)",
    borderRadius: "6px", padding: "6px 10px", cursor: "pointer", fontSize: "0.9rem",
    color: "var(--text-muted, #64748B)", fontFamily: "inherit", flexShrink: 0,
  },
  controls: null,
  controlGroup: { display: "flex", flexDirection: "column", gap: "6px" },
  controlLabel: {
    fontSize: "0.72rem", fontWeight: 700,
    color: "var(--text-muted, #64748B)",
    textTransform: "uppercase", letterSpacing: "0.5px",
  },
  kBtnRow: { display: "flex", gap: "6px", flexWrap: "wrap" },
  kBtn: {
    padding: "6px 14px", border: "1px solid var(--border, #E2E8F0)", borderRadius: "6px",
    background: "var(--surface-2, #F1F5F9)", color: "var(--text, #0F172A)",
    fontSize: "0.84rem", fontWeight: 600, fontFamily: "inherit", cursor: "pointer",
    transition: "border-color 0.12s, background 0.12s",
  },
  kBtnActive: {
    background: "var(--teal-light, #F0FDFA)",
    border: "1px solid var(--teal, #0D9488)",
    color: "var(--teal, #0D9488)",
    fontWeight: 700,
  },
  actionRow: { display: "flex", gap: "8px", flexWrap: "wrap" },
  btnAction: {
    padding: "8px 16px",
    background: "linear-gradient(135deg, var(--teal, #0D9488), var(--blue, #2563EB))",
    color: "#fff", border: "none", borderRadius: "7px", fontSize: "0.84rem", fontWeight: 700,
    fontFamily: "inherit", cursor: "pointer",
    boxShadow: "0 2px 6px rgba(13,148,136,0.22)", transition: "opacity 0.12s",
  },
  btnRunning: { background: "linear-gradient(135deg, #D97706, #B45309)", boxShadow: "0 2px 6px rgba(217,119,6,0.25)" },
  btnSecondary: { background: "var(--text-muted, #64748B)", boxShadow: "none" },
  btnDisabled: { opacity: 0.4, cursor: "not-allowed", boxShadow: "none" },
  phaseBanner: {
    padding: "10px 14px", marginBottom: "16px",
    background: "var(--teal-light, #F0FDFA)",
    border: "1px solid var(--teal-mid, #CCFBF1)",
    borderRadius: "8px", fontSize: "0.85rem",
    color: "var(--teal, #0D9488)", fontWeight: 500,
  },
  phaseBannerConverged: {
    background: "var(--green-light, #ECFDF5)",
    border: "1px solid var(--green-mid, #A7F3D0)",
    color: "var(--green, #059669)",
  },
  statsRow: {
    display: "flex", flexWrap: "wrap", gap: "8px", marginTop: "16px",
  },
  statBox: {
    background: "var(--bg, #F8FAFC)", border: "1px solid var(--border, #E2E8F0)",
    borderRadius: "8px", padding: "8px 14px",
    display: "flex", flexDirection: "column", gap: "2px", minWidth: "82px",
  },
  statLabel: {
    fontSize: "0.68rem", fontWeight: 700,
    color: "var(--text-subtle, #94A3B8)",
    textTransform: "uppercase", letterSpacing: "0.5px",
  },
  statValue: {
    fontSize: "1.15rem", fontWeight: 800,
    color: "var(--text, #0F172A)",
  },
  legend: {
    display: "flex", flexWrap: "wrap", gap: "12px",
    marginTop: "14px", alignItems: "center",
  },
  legendItem: {
    display: "flex", alignItems: "center", gap: "5px",
    fontSize: "0.76rem", color: "var(--text-muted, #64748B)",
  },
  legendDot: {
    display: "inline-block", width: "8px", height: "8px",
    borderRadius: "50%", marginLeft: "4px",
  },
};

// Binary Search array visualisation styles
const bs = {
  arrayWrapper: {
    overflowX: "auto",
    paddingBottom: "4px",
    marginBottom: "4px",
  },
  indexRow: {
    display: "flex",
    gap: "4px",
    marginBottom: "4px",
  },
  indexCell: {
    width: "46px",
    minWidth: "46px",
    textAlign: "center",
    fontSize: "0.7rem",
    color: "var(--color-text-muted, #64748b)",
    fontWeight: 600,
  },
  cellRow: {
    display: "flex",
    gap: "4px",
  },
  cell: {
    width: "46px",
    minWidth: "46px",
    height: "52px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "6px",
    border: "2px solid #e2e8f0",
    background: "#f8fafc",
    fontSize: "0.95rem",
    fontWeight: 700,
    color: "var(--color-text, #1e293b)",
    position: "relative",
    transition: "background 0.2s, border-color 0.2s",
    userSelect: "none",
  },
  cellMid: {
    background: "#fffbeb",
    border: "2px solid #d97706",
    color: "#92400e",
  },
  cellLow: {
    background: "#f0fdf4",
    border: "2px solid #16a34a",
    color: "#14532d",
  },
  cellHigh: {
    background: "#faf5ff",
    border: "2px solid #9333ea",
    color: "#581c87",
  },
  cellFound: {
    background: "#eff4ff",
    border: "2px solid #1a56db",
    color: "#1e3a8a",
    boxShadow: "0 0 0 3px rgba(26,86,219,0.18)",
  },
  cellElim: {
    opacity: 0.32,
    background: "#f1f5f9",
    border: "2px solid #cbd5e1",
  },
  pointerRow: {
    position: "absolute",
    bottom: "-20px",
    display: "flex",
    gap: "2px",
    whiteSpace: "nowrap",
  },
  pointer: {
    fontSize: "0.6rem",
    fontWeight: 700,
    padding: "1px 4px",
    borderRadius: "3px",
  },
  pointerMid:  { background: "#fef3c7", color: "#92400e" },
  pointerLow:  { background: "#dcfce7", color: "#14532d" },
  pointerHigh: { background: "#f3e8ff", color: "#581c87" },
  legendSwatch: {
    width: "22px",
    minWidth: "22px",
    height: "22px",
    fontSize: "0.7rem",
    borderRadius: "4px",
    marginRight: "2px",
  },
};

export default VirtualLab;
