import { State } from './interfaces/state.interface';

export class ExecutionState implements State {
  public logs: string[] = [];

  addLog(log: string): void {
    this.logs.push(log);
  }

  getLogs(): string[] {
    return this.logs;
  }
}
