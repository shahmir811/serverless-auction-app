# Serverless Auction App

> Building a Node Serverless Auction App that facilitates online bidding and auctions.

## Prerequisites

- Must have an AWS account with sufficient permissions and programmatic access on multiple servers I have mentioned in the AWS Services section below.
- Install and configure AWS CLI locally. It will ask for the following details:

  - Access Key
  - Secret Access Key
  - Region
  - Output Options

- Used Node version 16.20.0 for auction-service, as we are using aws-sdk version 02.
- Used Node version 14.21.3 for auth-service.

  ## List of AWS Services

Covered the following AWS services:

| Name             | Description                         |
| ---------------- | ----------------------------------- |
| API Gateway      | Used for making API calls           |
| Auth0            | For authentication incoming request |
| Lambda Functions | Implemented backend logic           |
| DynamoDB         | NoSQL database storage              |
| S3 Bucket        | Used for storing images             |
| Auth0            | Used for authentication             |
| EventBridge      | For firing custom events            |
| SQS              | Queue service                       |
| SES              | Sending emails to highest bidder    |
