import * as cdk from 'aws-cdk-lib';
import * as dynamodb from 'aws-cdk-lib/aws-dynamodb';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import { Construct } from 'constructs';
import * as path from 'path';
import { Lambda } from './common/compute/lambda'
import { DynamoDB } from './common/storage/dynamodb'
import { EventBus } from './common/communication/eventbridge'

// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class CloudCostAuditorStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const ruleSetLambda = new Lambda(this, 'RuleSetLambda', {
      runtime: lambda.Runtime.PROVIDED_AL2,
      handler: 'main',
      code: lambda.Code.fromAsset(path.join(__dirname, '../artifacts/ruleSetLambda.zip')),
    })

    const resourceLambda = new Lambda(this, 'ResourceLambda', {
      runtime: lambda.Runtime.PROVIDED_AL2,
      handler: 'main',
      code: lambda.Code.fromAsset(path.join(__dirname, 'lambda-handler'))
    });

    const actionLambda = new Lambda(this, 'ActionLambda', {
      runtime: lambda.Runtime.PROVIDED_AL2,
      handler: 'main',
      code: lambda.Code.fromAsset(path.join(__dirname, 'lambda-handler'))
    });

    const dynamodbTable = new DynamoDB(this, 'ResourceTable', {
      partitionKey: { name: 'pk', type: dynamodb.AttributeType.STRING },
      sortKey: { name: 'sk', type: dynamodb.AttributeType.STRING },
    });

    const eventBus = new EventBus(this, 'EventBus', {});


    



    
    
    
    
    

    
  }
}
