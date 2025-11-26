export function Fcfs(processes) {
  let data = processes.map(p => ({ ...p }));
  data.sort((a, b) => a.arrival - b.arrival);

  let currentTime = 0;
  let gantt = [];

  data.forEach(p => {
    if (currentTime < p.arrival) currentTime = p.arrival;

    let start = currentTime;
    let end = start + p.burst;

    // Gantt block
    gantt.push({ id: p.id, start, end });

    p.completion = end;
    p.tat = p.completion - p.arrival;
    p.wt = p.tat - p.burst;

    currentTime = end;
  });

  return { result: data, gantt };
}
