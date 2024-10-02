import { Action } from '../interfaces/action.interface';

export class SendEmailAction implements Action {
  private readonly sender: string;
  private readonly receiver: string;

  constructor(sender: string, receiver: string) {
    this.sender = sender;
    this.receiver = receiver;
  }

  async execute(): Promise<void> {
    console.log(`Sending email from ${this.sender} to ${this.receiver}`);
    // Log the Email sending action (instead of actual implementation).
  }
}
