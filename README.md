# TrendCarts Online Shop - REST API

This repository contains the source code for the REST API of the TrendCarts Online Shop. This backend is built using Express.js, Node.js, MongoDB, Mongoose, and Stripe for payment processing. The application is containerized using Docker and deployed using AWS with a blue/green deployment strategy.

## Table of Contents

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
- [API Documentation](#api-documentation)
- [Testing](#testing)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

## Features

- Categories management
- Products management
- Orders management
- Reviews management
- Payments processing
- User authentication and authorization

## Prerequisites

- Node.js (v14.x or later)
- MongoDB (v4.x or later)
- Docker (v19.x or later)
- AWS CLI (v2.x or later)

## Installation

1. Clone the repository:

git clone https://github.com/teuddy/TrendCart-Backend


3. Install the dependencies:

4. Create a `.env` file in the root directory and populate it with the required environment variables:


5. Start the MongoDB server:


6. Run the application:



## Usage

The API is accessible in production at `http://backend.trendcarts.net`.

For local development, the API will be running at `http://localhost:{PORT_OF_THE_ENV}`.

## API Documentation

The API documentation can be found at the `/docs` endpoint, e.g., `http://backend.trendcarts.net/docs` for the production environment or `http://localhost:3000/docs` for local development.

## Testing

To run the test suite, execute the following command:

npm test

## Deployment

The backend uses a aws codepipeline, just do a merge request.


## Contributing

Contributions are welcome! Please read our [contributing guidelines](CONTRIBUTING.md) to get started.

## License

This project is licensed under the [MIT License](LICENSE).