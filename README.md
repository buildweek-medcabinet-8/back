# Back-End

## Schema

#### Users

| Field    | Type    | Notes                              |
| -------- | ------- | ---------------------------------- |
| id       | integer | _primary key_ and _autoincrements_ |
| email    | string  | _required_ and _unique_            |
| password | string  | _required_                         |
| username | string  | _required_                         |

## API

BASE URL: https://bw-medcab-8.herokuapp.com
test account:

```json
{
  "email": "tester@email.com",
  "username": "test123",
  "password": "test"
}
```

#### Table of Contents

| Type | Path             | Notes               |
| ---- | ---------------- | ------------------- |
| POST | `/auth/register` | register a new user |
| POST | `auth/login`     | login an user       |

## Examples

#### POST /auth/register

request data:

```json
{
  "email": "username@email.com",
  "password": "password",
  "username": "Name"
}
```

response data:

```json
{
  "user": {
    "id": 1,
    "email": "username@email.com",
    "username": "Name"
  },
  "authorization": "really.long.token"
}
```

#### POST auth/login

request data:

```json
{
  "username": "test123",
  "password": "test"
}
```

response data:

```json
{
  "user": {
    "id": 1,
    "email": "username@email.com",
    "username": "Name"
  },
  "authorization": "really.long.token"
}
```

#### GET /profile

request data:

```json
{
  "headers": { "authorization": "really.long.token" }
}
```

response data:

```json
{
  "message": "welcome to your secret page"
}
```
