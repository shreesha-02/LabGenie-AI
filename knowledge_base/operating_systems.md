# Operating Systems Knowledge Base

## FCFS Scheduling

### Concept
First-Come, First-Served (FCFS) is a non-preemptive CPU scheduling algorithm in which processes are executed in the order in which they arrive.

### Working Principle
The process that arrives first gets the CPU first. Once a process starts execution, it continues until it completes.

### Algorithm Steps
1. Arrange processes according to their arrival time.
2. Select the first available process.
3. Execute the process until completion.
4. Move to the next process in the queue.
5. Calculate waiting time and turnaround time.

### Important Properties
- Non-preemptive scheduling algorithm.
- Simple and easy to implement.
- Can cause the convoy effect.
- Waiting time depends strongly on the execution order.

### Laboratory Requirements
- Computer or laptop
- Programming environment such as C, C++, Java, or Python
- Process information including arrival time and burst time

### Common Precautions
- Arrange processes correctly according to arrival time.
- Calculate waiting and turnaround times carefully.
- Handle processes with the same arrival time consistently.
- Check the Gantt chart before calculating averages.

### Viva Topics
- What is FCFS scheduling?
- Is FCFS preemptive or non-preemptive?
- What is the convoy effect?
- How is waiting time calculated?
- What are the advantages and limitations of FCFS?


## SJF Scheduling

### Concept
Shortest Job First (SJF) is a CPU scheduling algorithm that selects the process with the smallest CPU burst time.

### Working Principle
Among the available processes, the process requiring the shortest execution time is selected first.

SJF can be implemented as:
- Non-preemptive SJF
- Preemptive SJF, commonly called Shortest Remaining Time First (SRTF)

### Algorithm Steps
1. Identify the processes that have arrived.
2. Compare their burst times.
3. Select the process with the shortest burst time.
4. Execute it according to the selected SJF variant.
5. Repeat until all processes are completed.

### Important Properties
- Usually provides low average waiting time when burst estimates are accurate.
- Non-preemptive SJF runs the selected process until completion.
- SRTF can preempt the running process when a shorter remaining job arrives.
- Long processes may experience starvation.

### Laboratory Requirements
- Computer or laptop
- Programming environment
- Process arrival and burst-time data

### Common Precautions
- Distinguish between SJF and SRTF.
- Compare only processes that are currently available.
- Calculate remaining burst time correctly for preemptive scheduling.
- Handle equal burst times consistently.

### Viva Topics
- What is SJF?
- What is SRTF?
- Is SJF preemptive?
- What is starvation?
- Why can SJF provide low average waiting time?


## Round Robin Scheduling

### Concept
Round Robin is a preemptive CPU scheduling algorithm designed to give each process a fixed amount of CPU time called a time quantum.

### Working Principle
Processes are maintained in a circular ready queue. Each process receives the CPU for one time quantum. If it does not finish, it is placed at the end of the queue.

### Algorithm Steps
1. Place ready processes in the ready queue.
2. Select the first process.
3. Execute it for one time quantum or until completion.
4. If the process is unfinished, place it at the end of the queue.
5. Continue until all processes finish.

### Important Properties
- Preemptive scheduling algorithm.
- Provides fair CPU access to processes.
- Suitable for time-sharing systems.
- Performance depends on the selected time quantum.
- Very small time quantum can increase context-switching overhead.

### Laboratory Requirements
- Computer or laptop
- Programming environment
- Process burst times
- Time quantum

### Common Precautions
- Select the correct time quantum.
- Update remaining burst time after every execution.
- Handle newly arriving processes correctly.
- Do not add completed processes back to the queue.

### Viva Topics
- What is Round Robin scheduling?
- What is a time quantum?
- Is Round Robin preemptive?
- What happens when a process does not finish within its time quantum?
- What is context switching?


## Banker's Algorithm

### Concept
Banker's Algorithm is a deadlock-avoidance algorithm used to determine whether resource allocation can keep the system in a safe state.

### Working Principle
The algorithm checks resource requests before granting them. A request is granted only if the resulting system state remains safe.

Important data structures include:
- Available
- Maximum
- Allocation
- Need

The Need matrix is calculated as:

Need = Maximum - Allocation

### Algorithm Steps
1. Calculate the Need matrix.
2. Check the Available resources.
3. Find a process whose remaining Need can be satisfied.
4. Temporarily allocate the resources.
5. Assume the process completes and releases its resources.
6. Repeat until all processes can finish or no safe process remains.
7. If all processes can complete, the system is in a safe state.

### Important Properties
- Used for deadlock avoidance.
- Requires advance information about maximum resource requirements.
- A safe state does not necessarily mean that all resources are currently free.
- An unsafe state indicates that the system cannot guarantee safe completion.

### Laboratory Requirements
- Computer or laptop
- Programming environment
- Allocation, Maximum, and Available resource data

### Common Precautions
- Calculate Need correctly.
- Update Available resources carefully.
- Do not confuse safe state with deadlock-free execution at a particular instant.
- Verify the safe sequence before approving allocation.

### Viva Topics
- What is Banker's Algorithm?
- What is a safe state?
- What is an unsafe state?
- What is the Need matrix?
- Difference between deadlock avoidance and deadlock prevention?


## Page Replacement

### Concept
Page replacement is a memory-management technique used in virtual memory when a page fault occurs and there is no free frame available.

### Working Principle
When a required page is not present in memory, the operating system selects an existing page to remove and replaces it with the required page.

Common page replacement algorithms include:
- FIFO
- LRU
- Optimal

### Algorithm Steps
1. Start with empty memory frames.
2. Read the page reference string.
3. Check whether the requested page is already in memory.
4. If present, it is a page hit.
5. If absent, a page fault occurs.
6. If all frames are occupied, select a victim page using the chosen algorithm.
7. Replace the victim page with the requested page.
8. Continue until the reference string is processed.

### Important Properties
- FIFO replaces the page that entered memory first.
- LRU replaces the page that has not been used for the longest time.
- Optimal replaces the page whose next use is farthest in the future.
- Page replacement affects the page-fault rate.

### Laboratory Requirements
- Computer or laptop
- Programming environment
- Page reference string
- Number of memory frames

### Common Precautions
- Track page hits and page faults carefully.
- Maintain frame contents after every reference.
- Apply the selected replacement rule consistently.
- Check the final page-fault count.

### Viva Topics
- What is a page fault?
- What is page replacement?
- What is FIFO page replacement?
- What is LRU?
- What is the Optimal page replacement algorithm?


## Deadlock Detection

### Concept
Deadlock is a situation in which a set of processes are permanently waiting for resources held by one another. Deadlock detection determines whether the current resource-allocation state contains a deadlock.

### Working Principle
The operating system examines resource allocation and outstanding resource requests to determine whether processes can complete.

Important information may include:
- Available resources
- Allocation matrix
- Request matrix

### Algorithm Steps
1. Initialize the Available resources.
2. Find a process whose outstanding Request can be satisfied.
3. Assume that the process completes.
4. Release its allocated resources.
5. Update the Available resources.
6. Repeat for remaining processes.
7. If some processes cannot be completed, they may be involved in a deadlock.

### Necessary Conditions for Deadlock
Deadlock can occur when all four conditions hold:
- Mutual exclusion
- Hold and wait
- No preemption
- Circular wait

### Laboratory Requirements
- Computer or laptop
- Programming environment
- Resource allocation data
- Process request information

### Common Precautions
- Distinguish deadlock detection from deadlock avoidance.
- Update Available resources after each simulated completion.
- Check all remaining processes.
- Verify the final set of potentially deadlocked processes.

### Viva Topics
- What is deadlock?
- What are the four necessary conditions for deadlock?
- What is deadlock detection?
- Difference between deadlock detection and avoidance?
- What is a circular wait?