import * as dynamodb from 'aws-cdk-lib/aws-dynamodb';
import * as logs from 'aws-cdk-lib/aws-logs';
import * as iam from 'aws-cdk-lib/aws-iam';
import * as cdk from 'aws-cdk-lib';

interface DynamoDBProps extends dynamodb.TablePropsV2 {}

/*
Extended DynamoDB class which provides some default configuration
and allows for customizability in future
*/
export class DynamoDB extends dynamodb.TableV2 {
    constructor(scope: cdk.Stack, id: string, props: DynamoDBProps){
        super(scope, id, {
            ...props,
            billing: dynamodb.Billing.onDemand(),
            encryption: dynamodb.TableEncryptionV2.dynamoOwnedKey(),
            contributorInsights: true,
            deletionProtection: false,
            removalPolicy: cdk.RemovalPolicy.DESTROY,
            tableClass: dynamodb.TableClass.STANDARD,
        })
    }
}