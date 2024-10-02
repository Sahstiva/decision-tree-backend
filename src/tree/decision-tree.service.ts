import { Injectable } from '@nestjs/common';
import { Action } from './interfaces/action.interface';
import { SendSmsAction } from './actions/send-sms.action';
import { SendEmailAction } from './actions/send-email.action';
import { ConditionAction } from './actions/condition.action';
import { LoopAction } from './actions/loop.action';

@Injectable()
export class DecisionTreeService {
  async executeTree(tree: any): Promise<void> {
    const action = this.parseAction(tree);
    await action.execute();
  }

  private parseAction(json: any): Action {
    switch (json.type) {
      case 'SendSms':
        return new SendSmsAction(json.phoneNumber);
      case 'SendEmail':
        return new SendEmailAction(json.sender, json.receiver);
      case 'Condition':
        const trueAction = this.parseAction(json.trueAction);
        const falseAction = json.falseAction ? this.parseAction(json.falseAction) : undefined;
        return new ConditionAction(json.condition, trueAction, falseAction);
      case 'Loop':
        const loopAction = this.parseAction(json.action);
        return new LoopAction(loopAction, json.iterations);
      default:
        throw new Error(`Unknown action type: ${json.type}`);
    }
  }
}
