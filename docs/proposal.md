## Problem
AWS can be very expensive, with the root of the expense coming from Cloud Resources that are unused, unnecessary and misconfigured.

## Proposed Solution
A system which discovers cloud resources based on specified rulesets, proposes remedial action to the user and upon a grant, executes the action to reduce cost in a Serverless AWS Cloud Environment.

## Minimum Viable Product
- first ruleset: unused stacks older than a week old
- resource discovery mechanism
- action proposal mechanism
- action execution mechanism

### 1st Ruleset
Rulesets will determine how the service functions to deliver value. They will be stored in DynamoDB and will have a CRUD API attached to them. The first ruleset will eliminate cost related to old stacks, deleting stacks older than one week old. Not all stacks older than one week should be deleted so there will be an exception list to ensure those alpha, staging or prod stacks aren't being deleted.

### Resource Discovery Mechanism
The Resource Discovery Mechanism will be used to find resources in the cloud environment. The ruleset dictates what resources the resource discovery mechanism will look for and document. The Resource Discovery Mechanism will either be a step function of its own or a component of a step function. Discovered cloud resource identifiers will be stored in DynamoDB and be available via a GET API. 

### Action Proposal Mechanism
The Action Proposal Mechanism will analyze the resources discovered using the current set of rules and create an action proposal. The actional resources will be stored in DynamoDB available via a GET API. A POST API will be available to trigger the action proposal. This will send an event to trigger the Action Execution Mechanism.

### Action Execution Mechanism
The Action Execution Mechanism will execute the proposed action from the Action Proposal Mechanism. 