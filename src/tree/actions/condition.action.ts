import { Action } from '../interfaces/action.interface';

export class ConditionAction implements Action {
  private readonly condition: string;
  private trueAction: Action;
  private readonly falseAction?: Action;

  constructor(condition: string, trueAction: Action, falseAction?: Action) {
    this.condition = condition;
    this.trueAction = trueAction;
    this.falseAction = falseAction;
  }

  async execute(): Promise<void> {
    const result = eval(this.condition); // Evaluate the JavaScript condition
    console.log(`Condition '${this.condition}' evaluated to ${result}`);

    if (result) {
      await this.trueAction.execute();
    } else if (this.falseAction) {
      await this.falseAction.execute();
    }
  }
}
