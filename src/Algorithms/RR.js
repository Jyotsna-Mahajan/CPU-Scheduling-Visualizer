export function RR(processes, quantum) {
  // Copy processes
  let data = processes.map(p => ({
    ...p,
    remaining: p.burst
  }));

  // Sort by arrival time
  data.sort((a, b) => a.arrival - b.arrival);

  let currentTime = 0;
  let completed = 0;
  let n = data.length;

  let queue = [];
  let gantt = [];
  let lastProcess = null;

  // Start from first arrival
  currentTime = data[0].arrival;
  queue.push(data[0]);

  while (completed < n) {
    // If queue becomes empty → move to next arriving process
    if (queue.length === 0) {
      let next = data.find(p => p.remaining > 0);
      currentTime = next.arrival;
      queue.push(next);
    }

    let p = queue.shift();

    // Calculate time slice
    let timeUsed = Math.min(quantum, p.remaining);

    // --- Gantt Chart Block ---
    if (lastProcess !== p.id) {
      gantt.push({
        id: p.id,
        start: currentTime,
        end: currentTime + timeUsed
      });
    } else {
      // Extend the last block
      gantt[gantt.length - 1].end += timeUsed;
    }

    lastProcess = p.id;

    // Run for the time slice
    p.remaining -= timeUsed;
    currentTime += timeUsed;

    // Add new arrivals during the time slice
    data.forEach(proc => {
      if (
        proc.arrival > currentTime - timeUsed &&
        proc.arrival <= currentTime &&
        proc.remaining > 0 &&
        !queue.includes(proc)
      ) {
        queue.push(proc);
      }
    });

    // If finished
    if (p.remaining === 0) {
      p.completion = currentTime;
      p.tat = p.completion - p.arrival;
      p.wt = p.tat - p.burst;
      completed++;
    } else {
      // Not finished → push back
      queue.push(p);
    }
  }

  // Clean result (remove remaining)
  data.forEach(p => delete p.remaining);

  return {
    result: data,
    gantt: gantt
  };
}
