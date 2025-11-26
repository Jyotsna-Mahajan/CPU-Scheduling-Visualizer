export function Priority_NP(processes) {
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

    let highest = available.reduce((min, p) =>
      p.priority < min.priority ? p : min
    );

    let start = currentTime;
    let end = start + highest.burst;

    gantt.push({ id: highest.id, start, end });

    highest.completion = end;
    highest.tat = highest.completion - highest.arrival;
    highest.wt = highest.tat - highest.burst;

    currentTime = end;
    highest.done = true;
    completed++;
  }

  return { result: data, gantt };
}
