import * as sfn from 'aws-cdk-lib/aws-stepfunctions';
import * as cdk from 'aws-cdk-lib';
import * as logs from 'aws-cdk-lib/aws-logs';



interface StateMachineProps extends sfn.StateMachineProps {}

/*
Extended StateMachine class which provides some default configuration
and allows for customizability in future
*/
export class StateMachine extends sfn.StateMachine {
    constructor(scope: cdk.Stack, id: string, props: StateMachineProps){
        super(scope, id, {
            ...props,
            logs: {
                destination: new logs.LogGroup(scope, id+'-LogGroup', {
                    retention: logs.RetentionDays.TWO_WEEKS,
                    logGroupName: id+'-log-group',
                }),
                level: sfn.LogLevel.ALL,
            },
            removalPolicy: cdk.RemovalPolicy.DESTROY,
        })
    }
}