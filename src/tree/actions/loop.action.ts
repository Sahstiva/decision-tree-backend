import { Action } from '../interfaces/action.interface';
import { State } from '../interfaces/state.interface';

export class LoopAction implements Action {
  private action: Action;
  private readonly iterations: number;

  constructor(action: Action, iterations: number) {
    this.action = action;
    this.iterations = iterations;
  }

  async execute(state: State): Promise<void> {
    state.addLog(`Starting loop with ${this.iterations} iterations`);
    // console.log(`Starting loop with ${this.iterations} iterations`);

    for (let i = 0; i < this.iterations; i++) {
      state.addLog(`Executing iteration ${i + 1}`);
      // console.log(`Executing iteration ${i + 1}`);
      await this.action.execute(state);
    }
  }
}
