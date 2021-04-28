# Vitrine Rápida Server

The repo to store the main backend logic for the Vitrine Rápida application. 

## Installing dependencies

We install all the dependencies the project need by simply running: `npm install`

## Environment variables

In order to ease environment management, we use all application properties as envionment variables. Make sure to create a `.env` file in the root of the project. See an example with secrets for local environment:

PORT=5000

MONGO_URI=mongodb://localhost/vitrinerapida

JWT_SECRET=p1Nc9NnWrALjKKHtJZ1HQLIgrAwxL8py

JWT_EXPIRATION=24h

SALT_ROUNDS=6

## How to run it

Development: `npm start`

Running as development requires installing **nodemon**. Nodemon is a NPM package that detects changes in our Node.js application and automagically restarts the server. It's listed as a dev dependency.
 
## Notes

* In order to use the latest cool features from ES6+, we need to have at least Node.js version **8** installed in our environment.
* One can alternatively use **Yarn** as a replacement for **NPM**. Most of the commands will be similar.
