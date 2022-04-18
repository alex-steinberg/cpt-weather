# Cape Town Weather

Demo Angular app using Ionic 5 for UI components. Available at cape-weather dot steinrock dot co dot za

Gives the current a daily forecast of Cape Town's weather (with "Cape Town" loosely defined as -33.92, 18.42 for the time being). Other features:

- HTTP polling with exponential back-off to keep the data up-to-date
- Consumes openweathermap.org's REST API
- Hot & cold weather warnings

## Installation

Typical Angular/Ionic installation steps apply.

Install [Node LTS](https://nodejs.org/en/)

Clone the app:

    git clone git@github.com:alex-steinberg/cpt-weather.git

Change directories:

    cd cpt-weather

Install dependencies:

    npm i
    
Go to [openweathermap.org](https://openweathermap.org/) and create a free API key.

Create an .env file in the root your with the API key stored as an environment variable `OWM_API_KEY`:

    echo OWM_API_KEY=your-new-key-goes-here > .env
    
Add `'unsafe-eval'` to the `script-src` part of the content security policy to allow the app to inject the code necessary live reloading during development. Then run:

    npm start
    
to start the dev server.
    
To build for production:

    npm run build:prod 
    
To run the tests:

    npm test
    
## Hosting

Deploy the contents of the `www` directory and ensure all requests are redirected to index.html so that Angular can take care of the routing.

Using [AWS CodePipeline](https://aws.amazon.com/codepipeline/) (which uses CodeBuild), use a Node LTS Fermium image, such as `public.ecr.aws/docker/library/node:fermium-alpine3.14`, and the following buildspec:

```
version: 0.2

phases:
  build:
    commands:
       - npm i
       - echo 'OWM_API_KEY=<your-key>' > ./.env
       - npm run build:prod
artifacts:
  files:
    - '**/*'
  base-directory: 'www'
```

Note: the tests are rudimentary and this is not a rapidly changing codebase so the CI doesn't contain the test step.
Running tests in CI requires installing a headless browser at each build which adds an unnecessary expense to
the build pipeline for this demo project. 
