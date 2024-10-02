import { Action } from '../interfaces/action.interface';
import { State } from '../interfaces/state.interface';

export class SendEmailAction implements Action {
  private readonly sender: string;
  private readonly receiver: string;

  constructor(sender: string, receiver: string) {
    this.sender = sender;
    this.receiver = receiver;
  }

  async execute(state: State): Promise<void> {
    state.addLog(`Sent email from ${this.sender} to ${this.receiver}`);
    // console.log(`Sending email from ${this.sender} to ${this.receiver}`);
    // Log the Email sending action (instead of actual implementation).
  }
}
