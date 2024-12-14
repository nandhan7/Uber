# /users/register Endpoint Documentation

## Description
The `/users/register` endpoint allows new users to register by providing their full name, email, and password. Upon successful registration, a JSON Web Token (JWT) is generated and returned along with the user details.

## Endpoint
**POST** `/users/register`

## Request Body
The request body must include the following fields:

| Field               | Type   | Required | Description                                      |
|---------------------|--------|----------|--------------------------------------------------|
| `fullname.firstname`| String | Yes      | The first name of the user (min. 2 characters). |
| `fullname.lastname` | String | Yes      | The last name of the user (min. 5 characters).  |
| `email`             | String | Yes      | A valid and unique email address.               |
| `password`          | String | Yes      | The user's password (min. 6 characters).        |

### Example Request Body
```json
{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john.doe@example.com",
  "password": "securePassword123"
}
```

## Response
### Success Response
- **Status Code**: `201 Created`
- **Description**: User successfully registered.

#### Example Response Body
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "_id": "64df29f9f2d3e8c5a93e",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com"
  }
}
```

### Error Responses
#### Validation Errors
- **Status Code**: `400 Bad Request`
- **Description**: One or more validation errors occurred.

#### Example Response Body
```json
{
  "errors": [
    {
      "msg": "Invalid Email",
      "param": "email",
      "location": "body"
    }
  ]
}
```

#### Missing Fields
- **Status Code**: `400 Bad Request`
- **Description**: Required fields are missing.

#### Example Response Body
```json
{
  "message": "All fields are required"
}
```

## Validation Rules
- `fullname.firstname`: Must be at least 2 characters long.
- `fullname.lastname`: Must be at least 5 characters long.
- `email`: Must be a valid email address.
- `password`: Must be at least 6 characters long.

## Implementation Details
- The password is hashed before being stored in the database.
- A JWT is generated upon successful registration for authentication purposes.

## Notes
- The `socketId` field in the user model is optional and not required during registration.
- Make sure to set the `JWT_SECRET` environment variable in the server configuration to enable token generation.

## Dependencies
- **Express Validator**: For validating the input fields.
- **bcrypt**: For hashing passwords.
- **jsonwebtoken**: For generating authentication tokens.
