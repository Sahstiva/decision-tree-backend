import { Action } from '../interfaces/action.interface';

export class LoopAction implements Action {
  private action: Action;
  private readonly iterations: number;

  constructor(action: Action, iterations: number) {
    this.action = action;
    this.iterations = iterations;
  }

  async execute(): Promise<void> {
    console.log(`Starting loop with ${this.iterations} iterations`);

    for (let i = 0; i < this.iterations; i++) {
      console.log(`Executing iteration ${i + 1}`);
      await this.action.execute();
    }
  }
}
