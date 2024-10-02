import { DecisionTreeService } from '../src/tree/decision-tree.service';
import { SendSmsAction } from '../src/tree/actions/send-sms.action';
import { SendEmailAction } from '../src/tree/actions/send-email.action';

describe('DecisionTreeService', () => {
  let decisionTreeService: DecisionTreeService;

  beforeEach(() => {
    decisionTreeService = new DecisionTreeService();
  });

  it('should execute SendSmsAction', async () => {
    const spy = jest
      .spyOn(SendSmsAction.prototype, 'execute')
      .mockResolvedValue();

    const tree = {
      type: 'SendSms',
      phoneNumber: '+1234567890',
    };

    await decisionTreeService.executeTree(tree);

    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith({ logs: [] });
  });

  it('should execute SendEmailAction', async () => {
    const spy = jest
      .spyOn(SendEmailAction.prototype, 'execute')
      .mockResolvedValue();

    const tree = {
      type: 'SendEmail',
      sender: 'sender@example.com',
      receiver: 'receiver@example.com',
    };

    await decisionTreeService.executeTree(tree);

    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('should execute ConditionAction with true branch', async () => {
    const trueSpy = jest
      .spyOn(SendSmsAction.prototype, 'execute')
      .mockResolvedValue();
    const falseSpy = jest
      .spyOn(SendEmailAction.prototype, 'execute')
      .mockResolvedValue();

    const tree = {
      type: 'Condition',
      condition: 'true', // Always true
      trueAction: {
        type: 'SendSms',
        phoneNumber: '+1234567890',
      },
      falseAction: {
        type: 'SendEmail',
        sender: 'sender@example.com',
        receiver: 'receiver@example.com',
      },
    };

    await decisionTreeService.executeTree(tree);

    expect(trueSpy).toHaveBeenCalledTimes(1);
    expect(falseSpy).toHaveBeenCalledTimes(0); // False branch should not be called
  });

  it('should execute ConditionAction with false branch', async () => {
    const trueSpy = jest
      .spyOn(SendSmsAction.prototype, 'execute')
      .mockResolvedValue();
    const falseSpy = jest
      .spyOn(SendEmailAction.prototype, 'execute')
      .mockResolvedValue();

    const tree = {
      type: 'Condition',
      condition: 'false', // Always false
      trueAction: {
        type: 'SendSms',
        phoneNumber: '+1234567890',
      },
      falseAction: {
        type: 'SendEmail',
        sender: 'sender@example.com',
        receiver: 'receiver@example.com',
      },
    };

    await decisionTreeService.executeTree(tree);

    expect(trueSpy).toHaveBeenCalledTimes(0);
    expect(falseSpy).toHaveBeenCalledTimes(1); // False branch should be called
  });

  it('should execute LoopAction', async () => {
    const spy = jest
      .spyOn(SendSmsAction.prototype, 'execute')
      .mockResolvedValue();

    const tree = {
      type: 'Loop',
      iterations: 3,
      action: {
        type: 'SendSms',
        phoneNumber: '+1234567890',
      },
    };

    await decisionTreeService.executeTree(tree);

    expect(spy).toHaveBeenCalledTimes(3); // Ensure loop iterated 3 times
  });

  afterEach(() => {
    jest.restoreAllMocks(); // Restore all mocked functions
  });
});
