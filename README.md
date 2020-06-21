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

| Type | Path                             | Notes                                        |
| ---- | ---------------------------------|----------------------------------------------|
| POST | `/auth/register`                 | register a new user                          |
| POST | `/auth/login`                    | login an existing user                       |
| POST | `/profile/update-preferences`    | replace profile effects and flavors          |
| GET  | `/profile`                       | view "profile"                               |
| GET  | `/profile/delete-user`           | delete currently logged in user (via jwt)    |

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
         "description": "I mean this weed is basically the weediest and the cheesiest",
       }
  ]
```

#### POST /profile/update-preferences. This will delete your previous preferences
   //(Front-end, consider setting a limit of 5-10 effects and 10-20 flavors to increase model accuracy)
(include auth token in headers)
request data:

```json 
{      
          "flavors": ["Tropical", "Apple"]} "effects": ["Relaxed", "Happy"]
}
```

response data:

```json
{
    "message": "fr you just updated the flavors and the effects, bravo. I might even send a response or something someday",
    "sideNote": "just so you know, this update system is designed to delete your previous preferences. I hope you remember them"
}
```
