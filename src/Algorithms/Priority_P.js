export function Priority_P(processes) {
  // Copy array so original does not change
  let data = processes.map(p => ({
    ...p,
    remaining: p.burst
  }));

  // Sort by arrival time
  data.sort((a, b) => a.arrival - b.arrival);

  let currentTime = 0;
  let completed = 0;
  let n = data.length;

  let gantt = [];         // Gantt chart blocks
  let lastProcess = null; // Track switching

  while (completed < n) {
    // Processes that have arrived and still not finished
    let available = data.filter(
      p => p.arrival <= currentTime && p.remaining > 0
    );

    // CPU idle → jump to next arrival
    if (available.length === 0) {
      let next = data.find(p => p.remaining > 0);
      currentTime = next.arrival;
      continue;
    }

    // Select highest priority (priority number lowest is highest)
    let highest = available.reduce((min, p) =>
      p.priority < min.priority ? p : min
    );

    // Gantt chart block creation
    if (lastProcess !== highest.id) {
      // CPU switched to new process
      gantt.push({
        id: highest.id,
        start: currentTime,
        end: currentTime + 1
      });
    } else {
      // Extend existing block
      gantt[gantt.length - 1].end += 1;
    }

    lastProcess = highest.id;

    // Execute for 1 unit (preemptive)
    highest.remaining -= 1;
    currentTime += 1;

    // Process completed
    if (highest.remaining === 0) {
      highest.completion = currentTime;
      highest.tat = highest.completion - highest.arrival;
      highest.wt = highest.tat - highest.burst;
      completed++;
    }
  }

  // Remove remaining before returning
  data.forEach(p => delete p.remaining);

  return {
    result: data,
    gantt: gantt
  };
}
