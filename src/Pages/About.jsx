import { useNavigate } from "react-router-dom";
import "./About.css";


export default function About() {
  const navigate = useNavigate();
  return (
    <div className="about-page">
      <h1 className="heading">CPU Scheduling - Complete Overview</h1>

      <section>
        <h2>What is CPU Scheduling?</h2>
        <p>
          CPU Scheduling is the method used by the operating system to decide
          which process should run on the CPU at a given time. It increases
          system efficiency and ensures smooth multitasking.
        </p>
      </section>

      <section>
        <h2>Why do we need CPU Scheduling?</h2>
        <ul>
          <li>To improve CPU utilization</li>
          <li>To reduce waiting time</li>
          <li>To ensure fair process execution</li>
          <li>To maintain multitasking</li>
          <li>To provide quick response time</li>
        </ul>
      </section>

      <section>
        <h2>Real Life Examples of CPU Scheduling</h2>
        <ul>
          <li>Watching YouTube while downloading files</li>
          <li>Running Chrome with multiple tabs</li>
          <li>Using WhatsApp while listening to music</li>
          <li>Games running background processes like audio</li>
        </ul>
      </section>

      <section>
        <h2>Types of CPU Scheduling</h2>
        <table className="comparison-table">
          <thead>
            <tr>
              <th>Preemptive Scheduling</th>
              <th>Non-Preemptive Scheduling</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>CPU can be taken from a running process.</td>
              <td>Once assigned, CPU cannot be taken until completion.</td>
            </tr>
            <tr>
              <td>Better for real-time systems.</td>
              <td>Simpler but less flexible.</td>
            </tr>
            <tr>
              <td>Lower waiting time.</td>
              <td>Waiting time can be high.</td>
            </tr>
            <tr>
              <td>Examples: SRTF, Round Robin, Preemptive Priority.</td>
              <td>Examples: FCFS, SJF, Non-Preemptive Priority.</td>
            </tr>
            <tr>
              <td>Can interrupt running process.</td>
              <td>No interruption once started.</td>
            </tr>
          </tbody>
        </table>
      </section>

      <section>
        <h2>Important Terminologies used in CPU Scheduling Algorithms </h2>

        <h3>Arrival Time (AT)</h3>
        <p>The time at which the process enters the ready queue.</p>

        <h3>Burst Time (BT)</h3>
        <p>The total time needed by the process on the CPU.</p>

        <h3>Time Quantum (TQ)</h3>
        <p>
          The fixed time slice given to processes in Round Robin Scheduling
          Algorithm.
        </p>

        <h3>Priority Number</h3>
        <p>A value that decides the importance of a process.</p>

        <h3>Completion Time (CT)</h3>
        <p>The exact time at which a process finishes its execution.</p>

        <h3>Turnaround Time (TAT)</h3>
        <p>
          The total time a process spends in the system from arrival to
          completion.
          <br />
          <strong>Formula:</strong> TAT = Completion Time – Arrival Time
        </p>

        <h3>Waiting Time (WT)</h3>
        <p>
          The time a process spends waiting in the ready queue.
          <br />
          <strong>Formula:</strong> WT = Turnaround Time – Burst Time
        </p>
      </section>

      <section>
        <h2>Types of Scheduling Algorithms</h2>
        <ul>
          <li>FCFS (First Come First Serve)</li>
          <li>SJF (Shortest Job First)</li>
          <li>SRTF (Shortest Remaining Time First)</li>
          <li>Priority Scheduling (Preemptive & Non-Preemptive)</li>
          <li>Round Robin</li>
        </ul>
      </section>

      <section>
        <h2>1. First Come First Serve (FCFS)</h2>
        <p>
          FCFS is the simplest scheduling algorithm. Processes are executed in
          the order in which they arrive in the ready queue.
        </p>

        <h3>Advantages:</h3>
        <ul>
          <li>Simple to understand and implement</li>
          <li>Processes are executed in order of arrival</li>
        </ul>

        <h3>Disadvantages:</h3>
        <ul>
          <li>Leads to long waiting time for short processes</li>
          <li>
            It is Non-preemptive so CPU cannot be taken from the running process
          </li>
        </ul>
      </section>

      <section>
        <h2>2. Shortest Job First (SJF)</h2>
        <p>
          SJF selects the process with the shortest burst time. It is
          non-preemptive.
        </p>
        <h3>Advantages:</h3>
        <ul>
          <li>Minimum average waiting time</li>
          <li>Highly efficient for batch systems</li>
        </ul>

        <h3>Disadvantages:</h3>
        <ul>
          <li>Requires exact knowledge of burst time</li>
          <li>Can cause starvation of long processes</li>
        </ul>
      </section>

      <section>
        <h2>3. Shortest Remaining Time First (SRTF)</h2>
        <p>
          SRTF is the preemptive version of SJF. If a new process arrives with a
          smaller remaining time than the current one, the CPU switches
          immediately.
        </p>
        <h3>Advantages:</h3>
        <ul>
          <li>Even better average waiting time than SJF</li>
          <li>More responsive to short tasks</li>
        </ul>

        <h3>Disadvantages:</h3>
        <ul>
          <li>High overhead due to frequent preemptions</li>
          <li>Risk of starvation for long processes</li>
        </ul>
      </section>

      <section>
        <h2>4. Priority Scheduling - Non Preemptive</h2>
        <p>
          Every process is assigned a priority. The CPU is given to the
          highest-priority process. Lower-priority processes must wait.
        </p>

        <h3>Advantages:</h3>
        <ul>
          <li>Useful for real-time and time-critical tasks.</li>
          <li>Simple and easy to manage.</li>
        </ul>

        <h3>Disadvantages:</h3>
        <ul>
          <li>Starvation for low-priority processes.</li>
          <li>Priority inversion may occur.</li>
        </ul>
      </section>

      <section>
        <h2>5. Priority Scheduling - Preemptive</h2>
        <p>
          Works exactly like non-preemptive priority but with preemption. If a
          process with higher priority arrives, it immediately interrupts the
          current process.
        </p>
        <h3>Advantages:</h3>
        <ul>
          <li>More responsive to high-priority jobs.</li>
          <li>Useful for real-time OS.</li>
        </ul>

        <h3>Disadvantages:</h3>
        <ul>
          <li>More overhead due to preemption.</li>
          <li>Starvation unless aging is used.</li>
        </ul>
      </section>

      <section>
        <h2>6. Round Robin (RR)</h2>
        <p>
          Each process gets a fixed time slice (quantum). After the quantum
          finishes, the process is moved to the end of the queue. RR is perfect
          for time-sharing or interactive systems.
        </p>
        <h3>Advantages:</h3>
        <ul>
          <li>All processes get equal share of CPU.</li>
          <li>Great for interactive systems.</li>
        </ul>

        <h3>Disadvantages:</h3>
        <ul>
          <li>Too small quantum → too many context switches.</li>
          <li>Too large quantum → behaves like FCFS.</li>
        </ul>
      </section>
      <div className="btn-container">
        <button className="about-btn" onClick={() => navigate("/visualizer")}>
          Go to Visualizer
        </button>
      </div>
    </div>
  );
}
