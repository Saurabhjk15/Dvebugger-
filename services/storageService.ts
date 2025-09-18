
import type { SavedSolution } from '../types';

const HISTORY_KEY = 'devErrorLogHistory';

export function getHistory(): SavedSolution[] {
  try {
    const historyJson = localStorage.getItem(HISTORY_KEY);
    return historyJson ? JSON.parse(historyJson) : [];
  } catch (error) {
    console.error("Failed to parse history from localStorage", error);
    return [];
  }
}

export function saveSolution(solution: SavedSolution): void {
  const history = getHistory();
  // Avoid saving duplicates based on the exact error log
  const existingIndex = history.findIndex(item => item.errorLog === solution.errorLog);
  if (existingIndex > -1) {
    // Optional: update the existing one if needed, for now we just prevent duplicates
    return;
  }
  const newHistory = [...history, solution];
  localStorage.setItem(HISTORY_KEY, JSON.stringify(newHistory));
}

export function findSolution(errorLog: string): SavedSolution | undefined {
    const history = getHistory();
    return history.find(item => item.errorLog === errorLog);
}
