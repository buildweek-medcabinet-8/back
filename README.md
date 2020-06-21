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
  "username": "user1",
  "password": "password",
  "email": "anyemail1@email.com",
}
```

#### Table of Contents

| Type | Path                          | Notes                                     |
| ---- | ----------------------------- | ----------------------------------------- |
| POST | `/auth/register`              | register a new user                       |
| POST | `/auth/login`                 | login an existing user                    |
| POST | `/profile/update-preferences` | replace profile effects and flavors       |
| GET  | `/profile`                    | view profile                              |
| GET  | `/profile/recommendations`    | view recommendations (dummy data atm)     |
| GET  | `/profile/preferences`        | view saved preferences                    |
| GET  | `/profile/delete-user`        | delete currently logged in user (via jwt) |

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
  "message": "Registration successful",
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
  "username": "user1",
  "password": "password",
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

#### POST /profile/update-preferences This will delete your previous preferences

//(Front-end, consider setting a limit of 5-10 effects and 10-20 flavors to increase model accuracy)
(include auth token in headers)
request data:

```json
{
  "flavors": ["Tropical", "Apple"],
  "effects": ["Relaxed", "Happy"]
}
```

response data:

```json
{
  "message": "arr Josh, here be your prefs",
  "flavors": [
    {
      "flavor": "Tropical"
    },
    {
      "flavor": "Apple"
    }
  ],
  "effects": [
    {
      "effect": "Relaxed"
    },
    {
      "effect": "Happy"
    }
  ]
}
```

#### GET /profile

(include auth token in headers)
request data:

```json
{
  "headers": { "authorization": "bearer really.long.token" }
}
```

response data:

```json
{
  "message": "welcome to your secret page, ${user} "
}
```

#### GET /profile/recommendations. This is just dummy data, DS will update us once they're live. take note of the array.

request data:

```json
{
  "headers": { "authorization": "bearer really.long.token" }
}
```

response data:

```json
[
  {
    "yourName": "username, do a thing!",
    "Strain": "weed",
    "type": "teh green weed",
    "rating": "like 52 stars dude",
    "effect": ["Creative", "Energetic", "Tingly", "Focused"],
    "flavor": ["Minty", "Chemical", "Cheese"],
    "description": "I mean this weed is basically the weediest and the cheesiest"
  }
]
```

#### GET /profile/preferences

(include auth token in headers)
request data:

```json
{
  "headers": { "authorization": "bearer really.long.token" }
}
```

response data:

```json
{
  "message": "arr User, here be your prefs",
  "flavors": [
    {
      "flavor": "Tropical"
    },
    {
      "flavor": "Apple"
    }
  ],
  "effects": [
    {
      "effect": "Relaxed"
    },
    {
      "effect": "Happy"
    }
  ]
}
```

#### GET /profile/delete-user

(include auth token in headers)
request data:

```json
{
  "headers": { "authorization": "bearer really.long.token" }
}
```

response data:

```json
{
  "message": "YOU JUST DELETED ${user}, be sure to delete the token from memory"
}
```
