import { Action } from '../interfaces/action.interface';
import { State } from '../interfaces/state.interface';

export class SendSmsAction implements Action {
  private readonly phoneNumber: string;

  constructor(phoneNumber: string) {
    this.phoneNumber = phoneNumber;
  }

  async execute(state: State): Promise<void> {
    // console.log(`Sending SMS to ${this.phoneNumber}`);
    state.addLog(`Sent SMS to ${this.phoneNumber}`);
    // Log the SMS sending action (instead of actual implementation).
  }
}
