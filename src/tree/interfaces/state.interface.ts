export interface State {
  logs: string[];
  addLog(log: string): void;
  getLogs(): string[];
}
