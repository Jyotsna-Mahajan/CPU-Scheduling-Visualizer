export function Sjf(processes) {
  let data = processes.map(p => ({ ...p, done: false }));
  data.sort((a, b) => a.arrival - b.arrival);

  let currentTime = 0;
  let completed = 0;
  let n = data.length;
  let gantt = [];

  while (completed < n) {
    let available = data.filter(p => !p.done && p.arrival <= currentTime);

    if (available.length === 0) {
      currentTime = data.find(p => !p.done).arrival;
      continue;
    }

    let shortest = available.reduce((min, p) =>
      p.burst < min.burst ? p : min
    );

    let start = currentTime;
    let end = start + shortest.burst;

    gantt.push({ id: shortest.id, start, end });

    shortest.completion = end;
    shortest.tat = shortest.completion - shortest.arrival;
    shortest.wt = shortest.tat - shortest.burst;

    currentTime = end;
    shortest.done = true;
    completed++;
  }

  return { result: data, gantt };
}
