# Cape Town Weather

Demo Angular app using Ionic 5 for UI components. Available at 

Gives the current a daily forecast of Cape Town's\* weather. Other features:

- HTTP polling with exponential back-off to keep the weather up-to-date
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
    
To run the app for development: 

    npm start
    
To build for production:

    npm run build:prod 

And deploy the contents of the `www` directory. Ensure all requests are redirected to index.html so that Angular can take care of the routing.

\* Cape Town loosely defined as -33.92, 18.42 for the time being
