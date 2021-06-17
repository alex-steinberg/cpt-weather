# Cape Town Weather

Simple which gives the current a daily forecast of Cape Town's\* weather.

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



\* Cape Town loosely defined as -33.92, 18.42 for the time being
