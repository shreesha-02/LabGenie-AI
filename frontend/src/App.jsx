import { useState } from "react";
import Header from "./components/Header";
import GeneratorForm from "./components/GeneratorForm";
import LabManualResults from "./components/LabManualResults";
import Footer from "./components/Footer";
import VirtualLab from "./components/VirtualLab";
import AiLabAssistant from "./components/AiLabAssistant";
import { generateManual } from "./services/labService";

function App() {
  const [activePage, setActivePage] = useState("generate");
  const [manual, setManual] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleGenerate(formData) {
    setError("");
    setLoading(true);

    try {
      const result = await generateManual(formData);
      setManual(result);
      setActivePage("generate");
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  function renderPage() {
    switch (activePage) {
      case "tutor":
        return (
          <AiLabAssistant
            subject={manual?.meta?.subject}
            topic={manual?.meta?.topic}
          />
        );

      case "virtual-lab":
        return <VirtualLab />;

      case "generate":
      default:
        return (
          <>
            <GeneratorForm
              onGenerate={handleGenerate}
              loading={loading}
              error={error}
            />

            <LabManualResults manual={manual} />
          </>
        );
    }
  }

  return (
    <div className="app-wrapper">
      <Header
        activePage={activePage}
        onNavigate={setActivePage}
      />

      <main className="page-content">
        {renderPage()}
      </main>

      <Footer />
    </div>
  );
}

export default App;