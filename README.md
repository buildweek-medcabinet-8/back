# Back-End

## Schema

#### Users

| Field    | Type    | Notes                              |
| -------- | ------- | ---------------------------------- |
| id       | integer | _primary key_ and _autoincrements_ |
| email    | string  | _required_ and _unique_            |
| password | string  | _required_                         |
| username | string  | _required_                         |
| role     | string  | _required_                         |

## API

BASE URL: https://bw-use-my-tech-stuff.herokuapp.com/
test account:

```json
{
  "email": "tester@email.com",
  "username": "test123",
  "password": "test"
}
```

#### Table of Contents

| Type   | Path                        | Notes                                                                                               | Example                               |
| ------ | --------------------------- | --------------------------------------------------------------------------------------------------- | ------------------------------------- |
| POST   | `/api/auth/register`        | register a new user                                                                                 | [link](#post-apiauthregister)         |
| POST   | `/api/auth/login`           | login an user                                                                                       | [link](#post-apiauthlogin)            |
| &nbsp; |                             |                                                                                                     |                                       |
| GET    | `/api/user/:user_id`        | get user info; requires authorization                                                               | [link](#get-apiusersuser_id)          |
| PUT    | `/api/user/:user_id`        | update user info; requires authorization                                                            | [link](#put-apiusersuser_id)          |
| DELETE | `/api/user/:user_id`        | delete a user account; requires authorization                                                       | [link](#delete-apiusersuser_id)       |
| &nbsp; |                             |                                                                                                     |                                       |
| GET    | `/api/products`             | get products                                                                                        | [link](#get-apiproducts)              |
| POST   | `/api/products`             | create a new product post; requires `name` and `content`                                            | [link](#post-apiproducts)             |
| GET    | `/api/products/:product_id` | get a product                                                                                       | [link](#get-apireviewsreview_id)      |
| PUT    | `/api/products/:product_id` | update a product; change `liked` key to like or unlike a submitted product; requires authorization; | [link](#put-apiproductsproduct_id)    |
| DELETE | `/api/products/:product_id` | delete a product; requires authorization;                                                           | [link](#delete-apiproductsproduct_id) |

## Examples

#### POST /api/auth/register

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

#### POST /api/auth/login

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

#### GET /api/users/:user_id

response data

```json
{
  "id": 1,
  "email": "username@email.com",
  "username": "Name"
}
```

#### PUT /api/users/:user_id

request data

```json
{
  "email": "username@email.com",
  "username": "Name"
}
```

response data

```json
{
  "id": 1,
  "email": "username@email.com",
  "username": "Name"
}
```

#### DELETE /api/users/:user_id

response data

```
no content
```

#### GET /api/products/:product_id

response data

```json
{
  "id": 1,
  "name": "Name",
  "quote": "Price quote here",
  "image_URL": "image.com",
  "content": "About the product text",
  "approved": false
}
```

#### PUT /api/products/:product_id

request data

```json
{
  "name": "Name",
  "quote": "Price quote here",
  "image_URL": "image.com",
  "content": "About the product text",
  "approved": false
}
```

response data

```json
{
  "id": 1,
  "name": "Name",
  "quote": "Price quote here",
  "image_URL": "image.com",
  "content": "About the product text",
  "approved": true
}
```

#### DELETE /api/products/:product_id

response data

```
no content
```

#### GET /api/products

response data

```json
[
  {
    "id": 1,
    "name": "Name",
    "quote": "Price quote here",
    "image_URL": "image.com",
    "content": "About the product text",
    "approved": true
  },
  {
    "id": 2,
    "name": "Name",
    "quote": "Price quote here",
    "image_URL": "image.com",
    "content": "About the product text",
    "approved": true
  }
]
```

#### POST /api/products

request data

```json
{
  "name": "Name",
  "quote": "Price quote here",
  "image_URL": "image.com",
  "content": "About the product text"
}
```

response data

```json
{
  "id": 1,
  "name": "Name",
  "quote": "Price quote here",
  "image_URL": "image.com",
  "content": "About the product text",
  "approved": false
}
```

#### GET /api/stories/:product_id

response data

```json
{
  "id": 1,
  "name": "Name",
  "quote": "Price quote here",
  "image_URL": "image.com",
  "content": "About the product text",
  "approved": true
}
```
