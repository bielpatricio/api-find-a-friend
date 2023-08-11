<div id="top"></div>

<!-- PROJECT LOGO -->

<br />
<div align="center">
  <h1 align="center">Find a Friend Api</h3>
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

Find a Friend Api.
In this challenge I developed an API for animal adoption, a FindAFriend API, using SOLID and tests.

challenge link: https://efficient-sloth-d85.notion.site/Desafio-03-0b927eb32dbd4f21ab40224ffdf6cf19

Base layout: https://www.figma.com/file/CTTHUAQJZJayjWBx51KB7v/Find-A-Friend-(APP)-(Community)?node-id=7%3A2&mode=dev

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
$ git clone https://github.com/bielpatricio/api-find-a-friend
# Access the project folder in your terminal
$ cd api-find-a-friend
# Install the dependencies
$ npm i
# Run the docker
$ docker compose up -d
# Run the application in development mode
$ npm run start:dev
# You can have access of the registers with prisma studio
# The application will runing on port 5555, so you can access the url http://localhost:5555/ to see the registers.
$ npx prisma studio
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

# Routes

For the project, some routes were created:

## User
```
  1. Create a client user (role: CLIENT)
    (POST) http://localhost:3333/users
    1.1 body
      {
          "name": "biel",
          "email": "biel@gameofthrones.com",
          "password": "123456",
          "phone": "987456321",
          "address": "Rua Teste",
          "city": "João Pessoa",
          "state": "Paraíba"
      }

  2. Create a org user (role: ADMIN)
    (POST) http://localhost:3333/org
    2.1 body
      {
          "username": "bieu",
          "password": "123"
      }

  3. Get a user
    (GET) http://localhost:3333/me

  4. Refresh token to a user
    (PATCH) http://localhost:3333/token/refresh
```

## Pets
```
  1. Create a pet, need be logged with a org user (user with role ADMIN)
    (POST) http://localhost:3333/pets
    1.1 body
      {
          "name": "nick",
          "age": 2,
          "specie": "dog",
          "breed": "rusk",
          "description": "a very big dog"
      }

  2. Get all pets, params pagination and query to check specie or breed
    (GET) http://localhost:3333/pets

    2.1 params:
        page: 1
        q: puddle

    response example:
      {
          "pets": [
              {
                  "id": "8e18a967-d343-4e18-8bc5-9bc3971bd4f7",
                  "name": "lilo",
                  "age": 1,
                  "specie": "dog",
                  "breed": "mini puddle",
                  "description": "a very cute dog",
                  "created_at": "2023-08-09T17:38:41.181Z",
                  "updated_at": "2023-08-09T17:40:17.958Z",
                  "adopted": true,
                  "user_id": "d9760d00-4718-4d06-a2c5-27585db1ad85"
              },
              {
                  "id": "8f80ca75-b3fc-45be-9751-e95da5c33264",
                  "name": "ralph",
                  "age": 3,
                  "specie": "dog",
                  "breed": "mini puddle",
                  "description": "a very cute dog",
                  "created_at": "2023-08-08T02:42:08.457Z",
                  "updated_at": "2023-08-08T02:53:26.195Z",
                  "adopted": true,
                  "user_id": "e5962e17-2b22-4139-a542-0aac3e4a4d4b"
              },
              {
                  "id": "a37d4111-646d-422b-8f05-b18dcc409c77",
                  "name": "ralph",
                  "age": 3,
                  "specie": "dog",
                  "breed": "mini puddle",
                  "description": "a very cute dog",
                  "created_at": "2023-08-08T02:44:04.163Z",
                  "updated_at": "2023-08-08T02:44:04.163Z",
                  "adopted": false,
                  "user_id": "e5962e17-2b22-4139-a542-0aac3e4a4d4b"
              }
          ]
      }

  3. Get a pet detail by pet id
    (GET) http://localhost:3333/pets/:petId

  4. Get all pets from org id
    (GET) http://localhost:3333/pets/org/:orgId

    4.1 params:
        page: 1

  5. Get all pets nearby
    (GET) http://localhost:3333/pets/nearby

    5.1 params:
        page: 1
  
      response example:
  
        {
            "total": 2,
            "meals": [
                {
                    "id": "84ceba1d-ebc8-4508-9507-6efcbf490544",
                    "session_id": "93d3e512-32be-45ae-b055-7e704ff2ce13",
                    "name": "Cafe",
                    "description": "ovos e mamão",
                    "date": "2023-06-19T15:42:11-03:00",
                    "inDiet": true,
                    "createdAt": "2023-06-19 17:15:12",
                    "updatedAt": "2023-06-19 18:42:11"
                },
                {
                    "id": "8323b7c9-4c7a-4871-97ce-614239d96b79",
                    "session_id": "93d3e512-32be-45ae-b055-7e704ff2ce13",
                    "name": "janta",
                    "description": "ovo com bacon",
                    "date": "2023-06-19T14:15:21-03:00",
                    "inDiet": false,
                    "createdAt": "2023-06-19 17:15:21",
                    "updatedAt": "2023-06-19 17:47:51"
                },
            ]
        }

```

## Adoption
```
  1. Adopt a pet by pet id, need be logged with a client user (user with role CLIENT)
    (POST) http://localhost:3333/adoptions/:petId

  2. Get one adoption register of the organization by pet id, need be logged with a org user (user with role ADMIN)
    (GET) http://localhost:3333/adoptions/:petId

  3. Get all adoptions registers of the organization, need be logged with a org user (user with role ADMIN)
    (GET) http://localhost:3333/adoptions

    3.1 params:
        page: 1
```

# Prints
<p align="center" style="display: flex; align-items: flex-start; justify-content: center;">

![image](https://github.com/bielpatricio/api-find-a-friend/assets/32223762/061677c3-a83b-4f96-8406-3e64c5bda664)

![image](https://github.com/bielpatricio/api-find-a-friend/assets/32223762/3ff3ae62-9965-476d-8f67-6154551115af)

![image](https://github.com/bielpatricio/api-find-a-friend/assets/32223762/d4e833ed-29fd-43d9-9dea-2f2d035667c6)

![image](https://github.com/bielpatricio/api-find-a-friend/assets/32223762/bbae7bf1-b9e5-4450-a0f5-a81674886674)

![image](https://github.com/bielpatricio/api-find-a-friend/assets/32223762/2cd19c45-8dae-43ad-99ed-caf80bc25024)

![image](https://github.com/bielpatricio/api-find-a-friend/assets/32223762/06e5df7e-730d-4bda-94f7-2e373605c0fa)

![image](https://github.com/bielpatricio/api-find-a-friend/assets/32223762/e94c583e-b963-4638-947d-b0923c8432d0)

![image](https://github.com/bielpatricio/api-find-a-friend/assets/32223762/cb67fd11-35ed-4e41-a236-26079169f700)

![image](https://github.com/bielpatricio/api-find-a-friend/assets/32223762/8372ac8a-5ace-4f30-b4c7-f88127923150)

![image](https://github.com/bielpatricio/api-find-a-friend/assets/32223762/d8407c54-6d0f-49c1-8029-f6222b1861c7)


# Contact

Gabriel Patrício - <gabrieltp087@gmail.com> - [https://github.com/bielpatricio/](https://github.com/bielpatricio)

<p align="right">(<a href="#top">back to top</a>)</p>
