
---

# Decision Tree Processing Backend

This project is a backend implementation of a decision tree processor using **NestJS**. The decision tree enables customers to define and execute business logic tailored to their needs. The tree supports various actions such as sending SMS, sending emails, evaluating conditions, and looping over subtrees.

## Features

- **Send SMS Action**: Accepts a phone number as a parameter and simulates sending an SMS.
- **Send Email Action**: Accepts sender and receiver email addresses and simulates sending an email.
- **Condition Action**: Accepts a JavaScript expression as input and evaluates it to either execute a true or false branch.
- **Loop Action**: Accepts a subtree and an integer `x` representing the number of iterations to loop over the subtree.
- **JSON Serialization & Deserialization**: The decision tree supports serialization to JSON and deserialization from JSON.
- **Extensible Design**: New action types can easily be added by implementing the `Action` interface.

## Requirements

- **Node.js**: v18.13 or higher
- **npm**: v7.5 or higher
- **NestJS**: v10 or higher

## Installation

### 1. Clone the Repository

```bash
git clone https://github.com/your-repo/decision-tree-backend.git
cd decision-tree-backend
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Start the Application

```bash
npm run start
```

The application will run on `http://localhost:3000` by default.

### 4. Run Tests

To run the unit tests for the application:

```bash
npm run test
```

## API Endpoints

### POST `/decision-tree/execute`

This endpoint receives a JSON representation of a decision tree, deserializes it into action objects, and executes the decision tree.

#### Request

- **URL**: `/decision-tree/execute`
- **Method**: `POST`
- **Content-Type**: `application/json`

#### Example Payload

1. **Simple Condition-Based Tree**

This decision tree checks if the current year is 2025. If true, it sends an SMS. Otherwise, it sends an email.

```json
{
  "type": "Condition",
  "condition": "new Date().getFullYear() === 2025",
  "trueAction": {
    "type": "SendSms",
    "phoneNumber": "+1234567890"
  },
  "falseAction": {
    "type": "SendEmail",
    "sender": "sender@example.com",
    "receiver": "receiver@example.com"
  }
}
```

2. **Loop Example**

This decision tree sends an SMS 3 times:

```json
{
  "type": "Loop",
  "iterations": 3,
  "action": {
    "type": "SendSms",
    "phoneNumber": "+1234567890"
  }
}
```

#### Response

- **200 OK**: When the decision tree is successfully executed.
- **400 Bad Request**: If an invalid action has been sent.
- **500 Internal Server Error**: If there’s an issue with processing the decision tree.

## Application Structure

```bash
├── src
│   ├── app.module.ts          # Main application module
│   ├── main.ts                # Application entry point
│   └── tree                   # Decision tree processing logic
│       ├── actions            # Contains action implementations
│       │   ├── send-sms.action.ts
│       │   ├── send-email.action.ts
│       │   ├── condition.action.ts
│       │   └── loop.action.ts
│       ├── interfaces
│       │   └── action.interface.ts # Base Action interface
│       ├── decision-tree.controller.ts # Controller to handle API requests
│       ├── decision-tree.module.ts     # Decision tree module
│       └── decision-tree.service.ts    # Decision tree service
└── tests
    └── decision-tree.service.spec.ts   # Decision tree service test

```

### Key Components

- **Action Interface (`Action`)**: The base interface for all actions. New actions can be added by implementing this interface.
- **SendSmsAction**: Simulates sending an SMS.
- **SendEmailAction**: Simulates sending an email.
- **ConditionAction**: Evaluates a JavaScript expression and executes the true or false branch.
- **LoopAction**: Loops over a subtree for a specified number of iterations.
- **DecisionTreeService**: Parses and executes the decision tree.
- **DecisionTreeController**: Handles API requests and executes decision trees.

## Extensibility

You can easily add new actions to the decision tree by implementing the `Action` interface and adding them to the deserialization logic in the `DecisionTreeService`.

### Example: Adding a New Action

1. Create a new class that implements the `Action` interface.
2. Add it to the `DecisionTreeService`'s `parseAction` method for deserialization.

```typescript
class NewAction implements Action {
  async execute(): Promise<void> {
    console.log('Executing new action');
  }
}
```

## Contributing

Contributions are welcome! If you have ideas for improving the project, feel free to submit a pull request.

### Steps to Contribute:

1. Fork the repository.
2. Create a new branch for your feature or fix.
3. Commit your changes and push the branch.
4. Submit a pull request for review.

## License

This project is licensed under the MIT License.

---

### Contact

If you have any questions or need support, feel free to reach out!

---

This `README.md` gives a comprehensive overview of the project and how to use it, including setup instructions, API details, structure explanation, and test coverage.

