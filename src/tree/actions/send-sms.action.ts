import { Action } from '../interfaces/action.interface';

export class SendSmsAction implements Action {
  private readonly phoneNumber: string;

  constructor(phoneNumber: string) {
    this.phoneNumber = phoneNumber;
  }

  async execute(): Promise<void> {
    console.log(`Sending SMS to ${this.phoneNumber}`);
    // Log the SMS sending action (instead of actual implementation).
  }
}
