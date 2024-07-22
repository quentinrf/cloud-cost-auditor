#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { CloudCostAuditorStack } from '../lib/iac-stack';

const app = new cdk.App();

const stage = app.node.tryGetContext('stage');
const region = app.node.tryGetContext('region');
const account = app.node.tryGetContext('account');
const stackID = 'cloud-cost-auditor-' + stage;

new CloudCostAuditorStack(app, stackID, {
  env: { account: account, region: region }
});