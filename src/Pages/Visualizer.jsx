import { useState } from "react";
import "./Visualizer.css";
import { useEffect } from "react";
import { Fcfs } from "../Algorithms/Fcfs";
import { Sjf } from "../Algorithms/Sjf";
import { Srtf } from "../Algorithms/Srtf";
import { RR } from "../Algorithms/RR";
import { Priority_NP } from "../Algorithms/Priority_NP";
import { Priority_P } from "../Algorithms/Priority_P";

export default function Visualizer() {
  const [processes, setProcesses] = useState([
    { id: "P1", arrival: 0, burst: 5, priority: 1 },
  ]);
  const [algorithm, setAlgorithm] = useState("FCFS");
  const [quantum, setQuantum] = useState(2);

  const [result, setResult] = useState([]);
  const [gantt, setGantt] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Add Process
  const addProcess = () => {
    const newId = `P${processes.length + 1}`;
    setProcesses([
      ...processes,
      { id: newId, arrival: 0, burst: 1, priority: 1 },
    ]);
  };

  // Update input fields
  const updateField = (index, field, value) => {
    const copy = [...processes];
    copy[index][field] = Number(value);
    setProcesses(copy);
  };

  // Run Selected Algorithm
  const runAlgo = () => {
    let output;

    switch (algorithm) {
      case "FCFS":
        output = Fcfs(processes);
        break;
      case "SJF":
        output = Sjf(processes);
        break;
      case "SRTF":
        output = Srtf(processes);
        break;
      case "RR":
        output = RR(processes, quantum);
        break;
      case "Priority_NP":
        output = Priority_NP(processes);
        break;
      case "Priority_P":
        output = Priority_P(processes);
        break;
      default:
        output = { result: [], gantt: [] };
    }

    setResult(output.result);
    setGantt(output.gantt);
  };

  // Reset everything
  const resetAll = () => {
    setProcesses([{ id: "P1", arrival: 0, burst: 5, priority: 1 }]);
    setResult([]);
    setGantt([]);
  };

  const showPriority =
    algorithm === "Priority_NP" || algorithm === "Priority_P";

  // Averages
  const totalTAT = result.reduce((s, p) => s + p.tat, 0);
  const avgTAT = result.length ? (totalTAT / result.length).toFixed(2) : 0;

  const totalWT = result.reduce((s, p) => s + p.wt, 0);
  const avgWT = result.length ? (totalWT / result.length).toFixed(2) : 0;

  return (
    <div className="visualizer">
      {/* Algorithm selection */}
      <label>Select Algorithm: </label>
      <select value={algorithm} onChange={(e) => setAlgorithm(e.target.value)}>
        <option value="FCFS">FCFS</option>
        <option value="SJF">SJF</option>
        <option value="SRTF">SRTF</option>
        <option value="RR">Round Robin</option>
        <option value="Priority_NP">Priority (Non-Preemptive)</option>
        <option value="Priority_P">Priority (Preemptive)</option>
      </select>

      {/* Quantum for RR */}
      {algorithm === "RR" && (
        <div>
          <label>Quantum: </label>
          <input
            type="number"
            value={quantum}
            onChange={(e) => setQuantum(Number(e.target.value))}
          />
        </div>
      )}

      {/* Input Table */}
      <table border="1" cellPadding="6">
        <thead>
          <tr>
            <th>Process</th>
            <th>Arrival Time</th>
            <th>Burst Time</th>
            {showPriority && <th>Priority</th>}
          </tr>
        </thead>

        <tbody>
          {processes.map((p, i) => (
            <tr key={p.id}>
              <td>{p.id}</td>
              <td>
                <input
                  type="number"
                  value={p.arrival}
                  onChange={(e) => updateField(i, "arrival", e.target.value)}
                />
              </td>

              <td>
                <input
                  type="number"
                  value={p.burst}
                  onChange={(e) => updateField(i, "burst", e.target.value)}
                />
              </td>

              {showPriority && (
                <td>
                  <input
                    type="number"
                    value={p.priority}
                    onChange={(e) => updateField(i, "priority", e.target.value)}
                  />
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>

      <button onClick={addProcess}>Add Process</button>
      <button onClick={runAlgo}>Run</button>
      <button onClick={resetAll}>Reset</button>

      {/* Output */}
      {result.length > 0 && (
        <>
          <h2>Output Table</h2>
          <table border="1" cellPadding="6">
            <thead>
              <tr>
                <th>Process</th>
                <th>Arrival Time</th>
                <th>Burst Time</th>
                <th>Completion Time</th>
                <th>Turn Around Time (TAT)</th>
                <th>Waiting Time (WT)</th>
              </tr>
            </thead>

            <tbody>
              {result.map((p) => (
                <tr key={p.id}>
                  <td>{p.id}</td>
                  <td>{p.arrival}</td>
                  <td>{p.burst}</td>
                  <td>{p.completion}</td>
                  <td>{p.tat}</td>
                  <td>{p.wt}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <h3>Average TAT: {avgTAT}</h3>
          <h3>Average WT: {avgWT}</h3>

          {/* Gantt Chart */}
          <h2>Gantt Chart</h2>

          <div className="gantt-row">
            {gantt.map((g, index) => (
              <div
                key={index}
                className="gantt-box"
                style={{ width: (g.end - g.start) * 30 }}
              >
                {g.id}
              </div>
            ))}
          </div>

          {/* Time Labels */}
          <div className="time-labels">
            {gantt.map((g, i) => (
              <span
                key={i}
                style={{
                  marginLeft: (g.end - g.start) * 30 - 5,
                }}
              >
                {g.end}
              </span>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
