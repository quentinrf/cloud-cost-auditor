import * as apigateway from 'aws-cdk-lib/aws-apigateway';
import * as logs from 'aws-cdk-lib/aws-logs';
import * as cdk from 'aws-cdk-lib';

interface RestApiProps extends apigateway.RestApiProps {
    stage: string;
}
/*
Extended EventBus class which provides some default configuration
and allows for customizability in future
*/
export class RestApi extends apigateway.RestApi {
    constructor(scope: cdk.Stack, id: string, props: RestApiProps){
        super(scope, id, {
            ...props,
            deployOptions: {
                accessLogDestination: new apigateway.LogGroupLogDestination(new logs.LogGroup(scope, id+'-AccessLogGroup', {
                    retention: logs.RetentionDays.TWO_WEEKS,
                    removalPolicy: cdk.RemovalPolicy.DESTROY,
                }),),
                stageName: props.stage,
                accessLogFormat: apigateway.AccessLogFormat.jsonWithStandardFields(),
            },
            cloudWatchRole: true,
            cloudWatchRoleRemovalPolicy: cdk.RemovalPolicy.DESTROY,
            deploy: true,
        })
    }
}