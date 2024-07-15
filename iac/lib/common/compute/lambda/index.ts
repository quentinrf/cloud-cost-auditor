import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as logs from 'aws-cdk-lib/aws-logs';
import * as iam from 'aws-cdk-lib/aws-iam';
import * as cdk from 'aws-cdk-lib';

interface LambdaProps extends lambda.FunctionProps {}
/*
Extended Lambda class which provides some default configuration
and allows for customizability in future
*/
export class Lambda extends lambda.Function {
    
    constructor(scope: cdk.Stack, id: string, props: LambdaProps){
        super(scope, id, {
            ...props,
            architecture: lambda.Architecture.ARM_64,
            timeout: cdk.Duration.seconds(30),
            logGroup: new logs.LogGroup(scope, id+'-LogGroup', {
                retention: logs.RetentionDays.TWO_WEEKS,
                logGroupName: id+'-log-group',
            }),
            role: new iam.Role(scope, id+'-role', {
                assumedBy: new iam.ServicePrincipal('lambda.amazonaws.com'),
            }),
            loggingFormat: lambda.LoggingFormat.JSON,
        })
    }
}