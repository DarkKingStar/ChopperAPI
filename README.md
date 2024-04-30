# ChopperAPI

<p align="center">
    <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
  </p>
  
  <!-- [circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
  [circleci-url]: https://circleci.com/gh/nestjs/nest -->
  
<p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
  <p align="center">
  <a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
  <a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
  <a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
  <a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
  <a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
  <a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
  <a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
  <a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
    <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
      <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
    <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
  </p>

An API for streaming anime content, providing access to a vast library of anime series, movies, and episodes. Built using [NestJS](https://nestjs.com/) and [TypeORM](https://typeorm.io/), this API offers a seamless experience for developers looking to integrate anime streaming functionality into their applications.

## Introduction

Chopper API is a versatile and robust backend service designed to power various applications in the realm of entertainment, particularly focused on anime streaming. Built with scalability and performance in mind, Chopper API provides a comprehensive set of endpoints to fetch anime information, episodes, genres, and more. Whether you're building a web, mobile, or desktop application, Chopper API offers the necessary data and functionality to enhance the user experience.

## Features
- **Get Anime Info:** Retrieve detailed information about specific anime titles.
- **Get Anime Episodes:** Fetch episodes of a particular anime, with support for pagination and filtering.
- **Search Anime:** Search for anime titles based on user-defined queries.
- **Watch Episodes:** Stream episodes of anime directly through the API.
- **Discover Latest Anime:** Access the latest releases in the world of anime.
- **Explore Popular Anime:** Discover the most popular and trending anime titles.
- **Browse New Anime:** Find newly released anime series.
- **Explore Anime Movies:** Discover and explore anime movies available for streaming.
- **Browse Anime Genres:** Explore anime genres and filter titles based on genre preferences.
- **Get Anime by Genre:** Retrieve anime titles belonging to a specific genre, with support for pagination.

## Getting Started

Instructions for setting up the project locally.

### Prerequisites

List any software or dependencies required to run the project, along with installation instructions or links.

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/DarkKingStar/ChopperAPI.git
   ```
2. Navigate to the project directory:
   ```bash
   cd ChopperAPI
   ```
3. Install dependencies:
   ```bash
   npm install
   ```

### Running the Application

Provide steps to run the application locally.

```bash
npm start
```

## Project Structure

Explain the structure of the project directory and provide a brief overview of each major directory/file.

```
project-root/
│
├── src/
│   ├── controllers/
│   ├── dto/
│   ├── entities/
│   ├── modules/
│   ├── services/
│   ├── utils/
│   ├── app.module.ts
│   └── main.ts
├── test/
│   └── ...
├── .gitignore
├── package.json
├── ...
└── README.md
```
## Stay in touch

- Author - [Sounak Guha](https://myportfolio-two-bice.vercel.app/)
- Website - [Chopper IO](https://tony-chopper.vercel.app/)

## License

Nest is [MIT licensed](LICENSE).