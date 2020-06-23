# Back-End

## Schema

#### Users

| Field    | Type    | Notes                              |
| -------- | ------- | ---------------------------------- |
| id       | integer | _primary key_ and _autoincrements_ |
| email    | string  | _required_ and _unique_            |
| password | string  | _required_                         |
| username | string  | _required_                         |

#### Flavors

| Field  | Type    | Notes                              |
| ------ | ------- | ---------------------------------- |
| id     | integer | _primary key_ and _autoincrements_ |
| flavor | string  | _required_ and _unique_            |

#### Effects

| Field  | Type    | Notes                              |
| ------ | ------- | ---------------------------------- |
| id     | integer | _primary key_ and _autoincrements_ |
| effect | string  | _required_ and _unique_            |

#### User_Flavors

| Field     | Type    | Notes                          |
| --------- | ------- | ------------------------------ |
| flavor_id | integer | \_required\* and _primary key_ |
| user_id   | string  | \_required\* and _primary key_ |

#### User_Effects

| Field     | Type    | Notes                        |
| --------- | ------- | ---------------------------- |
| effect_id | integer | _required_ and _primary key_ |
| user_id   | integer | _required_ and _primary key_ |

#### Saved_Recommendations

| Field    | Type    | Notes                              |
| -------- | ------- | ---------------------------------- |
| id       | integer | _primary key_ and _autoincrements_ |
| user_id  | integer | _primary key_                      |
| strain   | string  | _required_                         |
| password | string  | _required_                         |
| username | string  | _required_                         |

## API

BASE URL: https://bw-medcab-8.herokuapp.com
test account:

```json
{
  "username": "user1",
  "password": "password",
  "email": "anyemail1@email.com"
}
```

#### Table of Contents

| Type   | Path                          | Notes                                      |
| ------ | ----------------------------- | ------------------------------------------ |
| POST   | `/auth/register`              | register a new user                        |
| POST   | `/auth/login`                 | login an existing user                     |
| POST   | `/profile/recs/save-rec`      | save a returned recommendation             |
| PUT    | `/profile/change-password`    | change user password                       |
| PUT    | `/profile/update-preferences` | replace profile effects and flavors        |
| GET    | `/profile`                    | view profile                               |
| GET    | `/profile/recs`               | view recommendations (dummy data atm)      |
| GET    | `/profile/recs/saved-recs`    | view user-saved recommendations            |
| GET    | `/profile/preferences`        | view saved preferences                     |
| DELETE | `/profile/del-user`           | delete currently logged in user (via jwt)  |
| DELETE | `/profile/recs/del-rec`       | delete single recommendation from server\* |

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
  "password": "password"
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

#### POST profile/recs/save-rec

request data:

```json
{
  "strain": "Big time weeds"
}
```

response data:

```json{
       "message": "Okay, ${user}, you just saved a ${strain} w33d.",
      "response": "1",
        }

```

#### PUT /profile/change-password This will delete your previous preferences

//(Front-end, consider setting a limit of 5-10 effects and 10-20 flavors to increase model accuracy)
(include auth token in headers)
request data:

```json
{
  "password": "newPassword"
}
```

response data:

```json
{
  "message": "YOU JUST UPDATED YOUR PASSWORD, ${user}, GOOD JOB!",
  "pwres": "int"
}
```

#### PUT /profile/update-preferences This will delete your previous preferences

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
  "message": "arr ${user}, here be your prefs",
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

#### GET /profile/recs This is just dummy data, DS will update us once they're live. take note of the array.

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

#### GET /profile/recs/saved-recs

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
  "message": "Okay, ${user}, here are your saved recommendations",
  "recs": [
    { "strain": "strain1" },
    { "strain": "strain2" },
    { "strain": "strain3" }
  ]
}
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

#### DELETE /profile/delete-user

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

#### DELETE /profile/saved-recs/delete-recommendation

(include auth token in headers)
request data:

```json
{
  "strain": "Big time weeds"
}
```

response data:

```json
{
  "message": "Okay, ${user}, you just deleted ${strain} from your recommendations"
}
```
