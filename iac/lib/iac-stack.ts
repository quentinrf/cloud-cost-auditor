import * as cdk from 'aws-cdk-lib';
import * as dynamodb from 'aws-cdk-lib/aws-dynamodb';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as apigateway from 'aws-cdk-lib/aws-apigateway';
import { Construct } from 'constructs';
import * as path from 'path';
import { Lambda } from './common/compute/lambda';
import { DynamoDB } from './common/storage/dynamodb';
import { EventBus } from './common/communication/eventbridge';
import { RestApi } from './common/communication/api-gateway';
import {
  AuthorizationType,
} from "aws-cdk-lib/aws-apigateway";
import {
  AccountPrincipal,
  PolicyDocument,
  PolicyStatement,
} from "aws-cdk-lib/aws-iam";

interface CloudCostAuditorStackProps extends cdk.StackProps {
  stage: string;
}

export class CloudCostAuditorStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props: CloudCostAuditorStackProps) {
    super(scope, id, props);

    const dynamodbTable = new DynamoDB(this, 'ResourceTable', {
      partitionKey: { name: 'pk', type: dynamodb.AttributeType.STRING },
      sortKey: { name: 'sk', type: dynamodb.AttributeType.STRING },
    });

    const eventBus = new EventBus(this, 'EventBus', {});

    const apiPolicy = new PolicyDocument({
      statements: [
        new PolicyStatement({
          actions: ["execute-api:Invoke"],
          principals: [
            new AccountPrincipal(this.account),
          ],
        }),
      ],
    });

    const restApi = new RestApi(this, 'RestApi', {
      stage: props.stage,
      defaultMethodOptions: {
        authorizationType: AuthorizationType.IAM,
      },
      policy: apiPolicy,
    })

    const rootPath = restApi.root.addResource('api');

    const ruleSetLambda = new Lambda(this, 'RuleSetLambda', {
      runtime: lambda.Runtime.PROVIDED_AL2,
      handler: 'main',
      code: lambda.Code.fromAsset(path.join(__dirname, '../../bin/ruleset.zip')),
    })

    const ruleSetLambdaIntegration = new apigateway.LambdaIntegration(ruleSetLambda);
    const ruleSetResource = rootPath.addResource('ruleset')
    const ruleSetMethod = ruleSetResource.addMethod('GET', ruleSetLambdaIntegration)

    const resourceLambda = new Lambda(this, 'ResourceLambda', {
      runtime: lambda.Runtime.PROVIDED_AL2,
      handler: 'main',
      code: lambda.Code.fromAsset(path.join(__dirname, '../../bin/ruleset.zip')),
    });

    const actionLambda = new Lambda(this, 'ActionLambda', {
      runtime: lambda.Runtime.PROVIDED_AL2,
      handler: 'main',
      code: lambda.Code.fromAsset(path.join(__dirname, '../../bin/ruleset.zip')),
    });    
  }
}
