<div id="top"></div>

<!-- PROJECT LOGO -->

<br />
<div align="center">
  <h1 align="center">Ignite Gym api</h3>
</div>

<!-- TABLE OF CONTENTS -->

## Contents

<p align="center">
    <p><a href="#about-the-project" title=" go to About the Project">About The Project</a></p>
    <p><a href="#running-locally" title=" go to Running locally">Running locally</a></p>
    <p><a href="#routes" title=" go to Routes">Routes</a></p>
    <p><a href="#contact" title=" go to Contact">Contact</a></p>
  </p>

<br>
<!-- ABOUT THE PROJECT -->

# About The Project

Ignite gym api.

GymPass style app. All Functional requirements, Business rules and Non-functional requirements were added.

## RFs (Functional requirements)

- It must be possible to register a pet
- It should be possible to list all pets available for adoption in a city
- It should be possible to filter pets by their characteristics
- It must be possible to view details of a pet for adoption
- It must be possible to register as an ORG
- Must be able to login as an ORG

## RNs (Business rules)

- To list the pets, we must inform the city
- An ORG needs to have an address and a WhatsApp number
- A pet must be linked to an ORG
- The user who wants to adopt will contact the ORG via WhatsApp
- All filters other than city are optional
- For an ORG to access the application as admin, it needs to be logged in

## RNFs (Non-functional requirements)

- The user's password must be encrypted;
- Application data must be persisted in a PostgreSQL database;
- All data lists must be paginated with 20 items per page;
- The user must be identified by a JWT (JSON Web Token);

<br>

# Running locally

```bash
# Clone this repository
$ git clone https://github.com/bielpatricio/api-ignite-gym
# Access the project folder in your terminal
$ cd api-ignite-gym
# Install the dependencies
$ npm i
# Run the docker
$ docker compose up -d
# Run the application in development mode
$ npm run start:dev
# The application will runing on port 3333, so you can access the url http://localhost:3333/ to do the requests.
# Run the unit tests
$ npm run test
# Run the E2E tests
$ npm run test:e2e
# Run the tests and get a relatory
$ npm run test:coverage
# Run the tests and open a interface to see better
$ npm run test:ui
```

# Contact

Gabriel Patrício - <gabrieltp087@gmail.com> - [https://github.com/bielpatricio/](https://github.com/bielpatricio)

<p align="right">(<a href="#top">back to top</a>)</p>
