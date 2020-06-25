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

#### Lists

| Field    | Type    | Notes                              |
| -------- | ------- | ---------------------------------- |
| id       | integer | _primary key_ and _autoincrements_ |
| userId   | string  | _required_                         |
| listName | string  | _required_                         |

#### List_Flavors

| Field     | Type    | Notes                          |
| --------- | ------- | ------------------------------ |
| flavor_id | integer | \_required\* and _primary key_ |
| list_id   | string  | \_required\* and _primary key_ |

#### List_Effects

| Field     | Type    | Notes                        |
| --------- | ------- | ---------------------------- |
| effect_id | integer | _required_ and _primary key_ |
| list_id   | integer | _required_ and _primary key_ |

#### Saved_Recommendations

| Field   | Type    | Notes                              |
| ------- | ------- | ---------------------------------- |
| id      | integer | _primary key_ and _autoincrements_ |
| user_id | integer | _primary key_                      |
| strain  | string  | _required_                         |

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

| Type   | Path                       | Notes                                       |
| ------ | -------------------------- | ------------------------------------------- |
| POST   | `/auth/register`           | register a new user                         |
| POST   | `/auth/login`              | login an existing user                      |
| POST   | `/profile/recs/save-rec`   | save a returned recommendation              |
| POST   | `/profile/add-list`        | save a new list                             |
| PUT    | `/profile/change-password` | change user password                        |
| PUT    | `/profile/update-list`     | replace list preferences                    |
| GET    | `/profile`                 | view profile                                |
| GET    | `/profile/recommendations` | view recommendations (dummy data atm)       |
| GET    | `/profile/recs/saved-recs` | view user-saved recommendations             |
| GET    | `/profile/preferences`     | view saved preferences for specific list    |
| GET    | `/profile/lists`           | Get all profiles/lists associated with user |
| GET    | `/traits/effects`          | get all effects in database                 |
| GET    | `/traits/flavors`          | get all flavors in database                 |
| DELETE | `/profile/del-user`        | delete currently logged in user (via jwt)   |
| DELETE | `/profile/recs/del-rec`    | delete single recommendation from server    |
| DELETE | `/profile/delete-list`     | delete list from server                     |

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

#### POST profile/recs/add-list

request data:

```json
{
  "listName": "Sleepy",
  "flavors": ["Apple", "Coffee"],
  "effects": ["Happy", "Uplifted"],
  "description": "Optional user-provided description"
}
```

response data:

```json
{
  "message": "you just CREATED list: Sleepyz, user2 ",
  "effects": ["Happy", "Uplifted"],
  "flavors": ["Apple", "Coffee"],
  "description": "get outta hereeeeeee"
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

#### PUT /profile/update-list

//(Front-end, consider setting a limit of 5-10 effects and 10-20 flavors to increase model accuracy)
(include auth token in headers)
request data:

```json
{
  "listName": "Sleepy",
  "flavors": ["Apple", "Coffee"],
  "effects": ["Happy", "Uplifted"],
  "description": "Optional user-provided description"
}
```

response data:

```json
{
  "message": "you updated your preferences for list: Sleepy, user2 ",
  "effects": ["Happy", "Uplifted"],
  "flavors": ["Apple", "Coffee"],
  "description": "Optional user-provided description",
  "sideNote": "preferences updated for list Sleepy"
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

#### GET /profile/recommendations

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
    "rating": 5,
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
  "listName": "Pass List Name Here (Case Sensitive)"
}
```

response data:

```json
{
  "message": "arr user2, here be your prefs for list ${Pass List Name Here}",
  "flavors": [
    {
      "flavor": "Grapefruit"
    },
    {
      "flavor": "Orange"
    }
  ],
  "effects": [
    {
      "effect": "None"
    },
    {
      "effect": "Giggly"
    }
  ],
  "description": "Depression and Anxiety",
  "listId": 6
}
```

#### GET /traits/preferences

response data:

```json
{
  "message": "here are the effects",
  "effects": [
    {
      "id": 1,
      "effect": "exampleEffect1"
    },
    {
      "id": 2,
      "effect": "exampleEffect2..."
    }
  ]
}
```

#### GET /traits/flavors

response data:

```json
{
  "message": "here are the flavors",
  "effects": [
    {
      "id": 1,
      "effect": "exampleFlavor1"
    },
    {
      "id": 2,
      "effect": "exampleFlavor2..."
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

#### DELETE /profile/delete-list

(include auth token in headers)
request data:

```json
{
  "listName": "programatically provide the list name here (Just the raw string)"
}
```

response data:

```json
{
  "message": "You just deleted list: (List name here)"
}
```
