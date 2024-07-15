import * as events from 'aws-cdk-lib/aws-events';
import * as cdk from 'aws-cdk-lib';

interface EventBusProps extends events.EventBusProps {}
/*
Extended EventBus class which provides some default configuration
and allows for customizability in future
*/
export class EventBus extends events.EventBus {
    constructor(scope: cdk.Stack, id: string, props: EventBusProps){
        super(scope, id, {
            ...props,
        })
    }
}