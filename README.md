# W4153 User Authentication Service

This is a microservice dedicated to handling user authentication. It supports user registration, login, token generation and verification.

## Usage

You should have a `.env` file placed in the root directory with the credentials to connect to a DB service.

It should look like

```
# DB credentials
DB_HOST=
DB_USER=admin
DB_PASSWORD=
DB_NAME=
DB_PORT=
# For this application
SERVER_PORT=
JWT_SECRET=your_jwt_secret
```

Use `npm install` to install dependencies.

## OpenAPI Documentation

Please visit `/api/docs`  endpoint in a browser to see the API documentations.

Three endpoints are offered.
- `auth/login`
- `auth/signup`
- `auth/profile`
