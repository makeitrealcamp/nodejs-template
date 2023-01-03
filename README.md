# Node.js Template - Make It Real 💻

Codebase for the node.js projects.

- Built with Node.js and Express
- Typescript
- Mongoose ODM
- REST API & GraphQL

## Prerequisites

- [Git](https://git-scm.com/downloads)
- [Volta.sh](https://dev.to/khriztianmoreno/introduccion-a-volta-la-forma-mas-rapida-de-administrar-entornos-de-node-1oo6)
-  [Node.js and npm](https://nodejs.org) Node >= 18.12 LTS, npm >= 8.19.x - Install with Volta.sh

## Express Router and Routes

| Route               | HTTP Verb | Route Middleware   | Description                          |
| --------------------| --------- | ------------------ | ------------------------------------ |
| /api/healthcheck    | GET       | isAuthenticated    | Show a simple message                |
| /api/users          | GET       | isAuthenticated    | Get list of users                    |
| /api/users          | POST      |                    | Creates a new users                  |
| /api/users/:id      | GET       | isAuthenticated    | Get a single users                   |
| /api/users/:id      | DELETE    | isAuthenticated    | Deletes a user                       |


## Usage
The use of endpoints is very simple, previously you could see a table of endpoints that you can call, if you need to create a note or log in, here we have some examples.

### Authentication **user** `/auth/local/login`:

Request Body:
```json
{
  "email": "cristian.moreno@makeitreal.camp",
  "password": "123456"
}
```

Response:
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImNyaXN0aWFuLm1vcmVub0BtYWtlaXRyZWFsLmNhbXAiLCJpYXQiOjE2NjEyMDgwODJ9.kPdMoVUEnyX36vi606Mc1C66yWLKKAB37GLbF0gzhBo",
  "profile": {
    "firstName": "cristian",
    "lastName": "moreno",
    "email": "cristian.moreno@makeitreal.camp",
    "avatar": "https://image.com/264.jpg",
    "role": "ADMIN"
  }
}
```
### Basic example **Create User** `/api/users`:

Request Body:
```json
{
  "firstName": "cristian",
  "lastName": "moreno",
  "email": "cristian.moreno@makeitreal.camp",
  "password": "123456",
  "avatar": "https://image.com/264.jpg",
}
```

Response:

```json
{
  "name": "cristian moreno",
  "email": "cristian.moreno@makeitreal.camp",
  "role": "USER",
}
```

### Developing

1. Run `npm install` to install server dependencies.

2. Configure the env
```shell
$ cp .env.example .env
```

3. Update `.env` with the required info

4. Run `npm run dev` to start the development server.


#### Convention

- [Commit Message Convention](https://www.conventionalcommits.org/en/v1.0.0/)
- [Git Flow](https://www.atlassian.com/es/git/tutorials/comparing-workflows/gitflow-workflow)
- [Git Commit Emoji](https://gitmoji.dev/)


## License

[MIT](LICENSE)
