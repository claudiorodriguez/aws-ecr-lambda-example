# aws-ecr-lambda-example

Example / POC for Amazon Lambda container images. WORK IN PROGRESS

See [Creating Lambda Container Images](https://docs.aws.amazon.com/lambda/latest/dg/images-create.html)

This lambda function will accept the `org` querystring parameter and return an array with the repositories it finds by requesting `https://api.github.com/orgs/{org}/repos` (this is just a proof of concept)

Deploy Flow:
  - Build docker image
  - Push image to Amazon ECR (tag latest, scan on push)
  - Update Lambda function from container uri

Use Flow:
  - Request to Amazon Gateway
  - Run Lambda function
  - Fetch data from Github API

Dependencies:
  - Github Actions
  - Codecov
  - Docker
  - Amazon CLI
  - Amazon ECR
  - Amazon Lambda
  - Amazon Gateway

Tokens (in Github Actions):
  - Codecov (PR test coverage)
  - Amazon ECR (push image)
  - Amazon Lambda (update function code with image uri)

Local dev:
  - `git clone`
  - `yarn start`
  - `curl -XPOST "http://localhost:9000/2015-03-31/functions/function/invocations" -d '{"queryStringParameters":{"org":"nodejs"}}'`