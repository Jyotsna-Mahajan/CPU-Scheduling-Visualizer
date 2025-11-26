export function Srtf(processes) {
  // Copy the array
  let data = processes.map(p => ({ ...p }));

  // Sort by arrival time
  data.sort((a, b) => a.arrival - b.arrival);

  let currentTime = 0;
  let completed = 0;
  let n = data.length;

  // Add remaining time
  data.forEach(p => p.remaining = p.burst);

  // Gantt chart array
  let gantt = [];
  let lastProcess = null; // to detect switches

  while (completed < n) {
    // Get available processes
    let available = data.filter(p => p.arrival <= currentTime && p.remaining > 0);

    if (available.length === 0) {
      currentTime = data.find(p => p.remaining > 0).arrival;
      continue;
    }

    // Shortest remaining time
    let shortest = available.reduce((min, p) =>
      p.remaining < min.remaining ? p : min
    );

    // If CPU switches to a new process → create new gantt block
    if (lastProcess !== shortest.id) {
      gantt.push({
        id: shortest.id,
        start: currentTime,
        end: currentTime + 1
      });
    } else {
      // Extend the previous block
      gantt[gantt.length - 1].end += 1;
    }

    lastProcess = shortest.id;

    // Execute for 1 unit
    shortest.remaining -= 1;
    currentTime += 1;

    // If finished
    if (shortest.remaining === 0) {
      shortest.completion = currentTime;
      shortest.tat = shortest.completion - shortest.arrival;
      shortest.wt = shortest.tat - shortest.burst;
      completed++;
    }
  }

  // Remove "remaining" before sending result
  data.forEach(p => delete p.remaining);

  return {
    result: data,
    gantt: gantt
  };
}
