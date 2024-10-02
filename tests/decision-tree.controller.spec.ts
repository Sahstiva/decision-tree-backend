import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { INestApplication } from '@nestjs/common';
import { DecisionTreeModule } from '../src/tree/decision-tree.module';

describe('DecisionTreeController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [DecisionTreeModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should execute a decision tree that sends an SMS', async () => {
    const treePayload = {
      type: 'SendSms',
      phoneNumber: '+1234567890',
    };

    const response = await request(app.getHttpServer())
      .post('/decision-tree/execute')
      .send(treePayload)
      .expect(200);

    expect(response.text).toEqual('Decision Tree Executed');
  });

  it('should execute a condition that evaluates to true and sends an SMS', async () => {
    const treePayload = {
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

    const response = await request(app.getHttpServer())
      .post('/decision-tree/execute')
      .send(treePayload)
      .expect(200);

    expect(response.text).toEqual('Decision Tree Executed');
  });

  it('should execute a loop that sends an SMS 3 times', async () => {
    const treePayload = {
      type: 'Loop',
      iterations: 3,
      action: {
        type: 'SendSms',
        phoneNumber: '+1234567890',
      },
    };

    const response = await request(app.getHttpServer())
      .post('/decision-tree/execute')
      .send(treePayload)
      .expect(200);

    expect(response.text).toEqual('Decision Tree Executed');
  });

  it('should return 400 for an invalid action type', async () => {
    const invalidPayload = {
      type: 'InvalidAction',
    };

    const response = await request(app.getHttpServer())
      .post('/decision-tree/execute')
      .send(invalidPayload)
      .expect(400);

    expect(response.text).toContain('Unknown action type');
  });
});
