# /users/register Endpoint Documentation

## Description

The `/users/register` endpoint allows new users to register by providing their full name, email, and password. Upon successful registration, a JSON Web Token (JWT) is generated and returned along with the user details.

## Endpoint

**POST** `/users/register`

## Request Body

The request body must include the following fields:

| Field                | Type   | Required | Description                                     |
| -------------------- | ------ | -------- | ----------------------------------------------- |
| `fullname.firstname` | String | Yes      | The first name of the user (min. 2 characters). |
| `fullname.lastname`  | String | Yes      | The last name of the user (min. 5 characters).  |
| `email`              | String | Yes      | A valid and unique email address.               |
| `password`           | String | Yes      | The user's password (min. 6 characters).        |

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

# /users/login Endpoint Documentation

## Description

The `/users/login` endpoint allows users to log in by providing their email and password. Upon successful authentication, a JSON Web Token (JWT) is generated and returned along with user details.

---

## Endpoint

**POST** `/users/login`

---

## Request Body

The request body must include the following fields:

| Field      | Type   | Required | Description                                     |
| ---------- | ------ | -------- | ----------------------------------------------- |
| `email`    | String | Yes      | A valid and registered email address.           |
| `password` | String | Yes      | The password associated with the email address. |

### Example Request Body

```json
{
  "email": "john.doe@example.com",
  "password": "securePassword123"
}
```

---

## Response

### Success Response

- **Status Code**: `201 Created`
- **Description**: User successfully logged in.

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

#### Invalid Credentials

- **Status Code**: `401 Unauthorized`
- **Description**: Email or password is incorrect.

#### Example Response Body

```json
{
  "message": "Invalid email or password"
}
```

---

## Validation Rules

- `email`: Must be a valid email address.
- `password`: Must be at least 6 characters long.

---

## Implementation Details

- The `password` field is compared against the hashed password stored in the database.
- If the email is not registered or the password does not match, a `401 Unauthorized` response is returned.
- A JWT token is generated upon successful login, which can be used for authentication in subsequent requests.

---

## Notes

- Ensure the `JWT_SECRET` environment variable is properly set for token generation.
- The `password` is not included in the response for security reasons.
- The `+password` selector in the `findOne` query ensures the password field is retrieved for comparison.

---

## Description

The `/users/profile` endpoint retrieves the currently authenticated user's profile, while the `/users/logout` endpoint logs out the user by blacklisting their token and clearing the authentication cookie.

---

## Endpoints

### **GET** `/users/profile`

#### Description

Retrieves the authenticated user's profile details.

#### Authorization

Requires a valid JWT token in the request headers (`Authorization: Bearer <token>`) or cookies.

#### Response

- **Status Code**: `200 OK`
- **Description**: Successfully retrieves the user's profile.

##### Example Response Body

```json
{
  "_id": "64df29f9f2d3e8c5a93e",
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john.doe@example.com"
}
```

#### Error Responses

- **Status Code**: `401 Unauthorized`
  - **Description**: User is not authenticated or token is invalid.

##### Example Error Response

```json
{
  "message": "Unauthorized"
}
```

---

### **GET** `/users/logout`

#### Description

Logs out the authenticated user by clearing the authentication cookie and blacklisting the token.

#### Authorization

Requires a valid JWT token in the request headers (`Authorization: Bearer <token>`) or cookies.

#### Response

- **Status Code**: `200 OK`
- **Description**: Successfully logs out the user.

##### Example Response Body

```json
{
  "message": "Logged Out"
}
```

#### Error Responses

- **Status Code**: `401 Unauthorized`
  - **Description**: User is not authenticated or token is invalid.

##### Example Error Response

```json
{
  "message": "Unauthorized"
}
```

---

## Authentication Middleware

### **authUser** Middleware

#### Description

Authenticates a user by verifying their JWT token from the `Authorization` header or `token` cookie.

#### Logic

1. Extracts the token from cookies or `Authorization` header.
2. Checks if the token is blacklisted.
3. Verifies the token using `JWT_SECRET`.
4. Attaches the decoded user object to `req.user` if valid.

#### Error Handling

- If no token is provided, or if the token is invalid/blacklisted, returns a `401 Unauthorized` response.

#### Example Error Response

```json
{
  "message": "Unauthorized"
}
```

---

## Implementation Details

### Logout Process

1. Clears the `token` cookie.
2. Extracts the token from the request headers or cookies.
3. Stores the token in a blacklist collection to prevent reuse.

---

## Dependencies

- **bcrypt**: For secure password handling.
- **jsonwebtoken**: For token generation and verification.
- **cookies**: For handling session cookies in the browser.
- **mongoose**: For interacting with MongoDB collections (e.g., user and token blacklist).
