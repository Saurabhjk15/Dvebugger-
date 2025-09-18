
export interface Solution {
  errorSummary: string;
  cause: string;
  stepsToResolve: string[];
  codeExample: string;
}

export interface SavedSolution {
  id: string;
  errorLog: string;
  solution: Solution;
  timestamp: string;
}
