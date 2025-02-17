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

# Captain Endpoints Documentation

## Overview
This documentation provides details about the endpoints for managing captain resources in the application. Captains are registered with their personal and vehicle information.

---

## Base URL
`/captains`

---

### POST `/register`

Registers a new captain.

#### Request
**Headers**:
- `Content-Type: application/json`

**Body**:
```json
{
  "fullname": {
    "firstname": "string",
    "lastname": "string"
  },
  "email": "string",
  "password": "string",
  "vehicle": {
    "color": "string",
    "plate": "string",
    "capacity": integer,
    "vehicleType": "car | motorcycle | auto"
  }
}
```

**Validation Rules**:
- `email`: Must be a valid email address.
- `fullname.firstname`: Minimum 3 characters.
- `password`: Minimum 6 characters.
- `vehicle.color`: Minimum 3 characters.
- `vehicle.plate`: Minimum 3 characters.
- `vehicle.capacity`: Must be at least 1.
- `vehicle.vehicleType`: Must be one of `car`, `motorcycle`, or `auto`.

#### Response
**Success (201)**:
```json
{
  "token": "string",
  "captain": {
    "fullname": {
      "firstname": "string",
      "lastname": "string"
    },
    "email": "string",
    "vehicle": {
      "color": "string",
      "plate": "string",
      "capacity": integer,
      "vehicleType": "string"
    }
  }
}
```

**Error (400)**:
- Missing or invalid fields:
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
- Duplicate captain:
```json
{
  "message": "Captain already exist"
}
```

---

### GET `/profile`

Retrieves the profile of the currently authenticated captain.

#### Request
**Headers**:
- `Authorization`: `Bearer <token>`

#### Response
**Success (200)**:
```json
{
  "captain": {
    "fullname": {
      "firstname": "string",
      "lastname": "string"
    },
    "email": "string",
    "vehicle": {
      "color": "string",
      "plate": "string",
      "capacity": integer,
      "vehicleType": "string"
    }
  }
}
```

**Error (401)**:
- Unauthorized:
```json
{
  "message": "Unauthorized"
}
```

---

### GET `/logout`

Logs out the currently authenticated captain by blacklisting their token.

#### Request
**Headers**:
- `Authorization`: `Bearer <token>`

#### Response
**Success (200)**:
```json
{
  "message": "Logout successfully"
}
```

**Error (401)**:
- Unauthorized:
```json
{
  "message": "Unauthorized"
}
```

---


# Ride Endpoints Documentation

## Overview
This documentation provides details about the endpoints for managing ride resources in the application. Users can create rides and calculate fares.

---

## Base URL
`/rides`

---

### POST `/create`

Creates a new ride.

#### Request
**Headers**:
- `Content-Type: application/json`
- `Authorization`: `Bearer <token>`

**Body**:
```json
{
  "pickup": "string",
  "destination": "string",
  "vehicleType": "auto | car | motorcycle"
}
```

**Validation Rules**:
- `pickup`: Minimum 3 characters.
- `destination`: Minimum 3 characters.
- `vehicleType`: Must be one of `auto`, `car`, or `motorcycle`.

#### Response
**Success (200)**:
```json
{
  "status": "success",
  "data": {
    "id": "string",
    "pickup": "string",
    "destination": "string",
    "vehicleType": "string",
    "user": "string",
    "createdAt": "string",
    "updatedAt": "string"
  }
}
```

**Error (400)**:
- Missing or invalid fields:
```json
{
  "status": "error",
  "message": [
    {
      "msg": "Invalid pickup address",
      "param": "pickup",
      "location": "body"
    }
  ]
}
```

**Error (500)**:
- Internal server error:
```json
{
  "status": "error",
  "message": "Internal server error"
}
```

---

### GET `/get-fare`

Calculates the fare for a ride.

#### Request
**Headers**:
- `Authorization`: `Bearer <token>`

**Query Parameters**:
- `pickup`: Minimum 3 characters.
- `destination`: Minimum 3 characters.

#### Response
**Success (200)**:
```json
{
  "status": "success",
  "data": 123.45
}
```

**Error (400)**:
- Missing or invalid fields:
```json
{
  "status": "error",
  "message": [
    {
      "msg": "Invalid pickup address",
      "param": "pickup",
      "location": "query"
    }
  ]
}
```

**Error (500)**:
- Internal server error:
```json
{
  "status": "error",
  "message": "Internal server error"
}
```

---

# Map Endpoints Documentation

## Overview
This documentation provides details about the endpoints for managing map resources in the application. Users can get coordinates, distance and time, and autocomplete suggestions.

---

## Base URL
`/maps`

---

### GET `/get-coordinates`

Retrieves the coordinates for a given address.

#### Request
**Headers**:
- `Authorization`: `Bearer <token>`

**Query Parameters**:
- `address`: Minimum 3 characters.

#### Response
**Success (200)**:
```json
{
  "status": "success",
  "data": {
    "lat": 12.345678,
    "lng": 98.765432
  }
}
```

**Error (400)**:
- Missing or invalid fields:
```json
{
  "status": "error",
  "message": [
    {
      "msg": "Invalid address",
      "param": "address",
      "location": "query"
    }
  ]
}
```

**Error (500)**:
- Internal server error:
```json
{
  "status": "error",
  "message": "Internal server error"
}
```

---

### GET `/get-distance-time`

Retrieves the distance and time between two locations.

#### Request
**Headers**:
- `Authorization`: `Bearer <token>`

**Query Parameters**:
- `origin`: Minimum 3 characters.
- `destination`: Minimum 3 characters.

#### Response
**Success (200)**:
```json
{
  "status": "success",
  "data": {
    "distance": {
      "text": "12.3 km",
      "value": 12345
    },
    "duration": {
      "text": "15 mins",
      "value": 900
    }
  }
}
```

**Error (400)**:
- Missing or invalid fields:
```json
{
  "status": "error",
  "message": [
    {
      "msg": "Invalid origin",
      "param": "origin",
      "location": "query"
    }
  ]
}
```

**Error (500)**:
- Internal server error:
```json
{
  "status": "error",
  "message": "Internal server error"
}
```

---

### GET `/get-suggestions`

Retrieves autocomplete suggestions for a given input.

#### Request
**Headers**:
- `Authorization`: `Bearer <token>`

**Query Parameters**:
- `input`: Minimum 3 characters.

#### Response
**Success (200)**:
```json
{
  "status": "success",
  "data": [
    "Suggestion 1",
    "Suggestion 2",
    "Suggestion 3"
  ]
}
```

**Error (400)**:
- Missing or invalid fields:
```json
{
  "status": "error",
  "message": [
    {
      "msg": "Invalid input",
      "param": "input",
      "location": "query"
    }
  ]
}
```

**Error (500)**:
- Internal server error:
```json
{
  "status": "error",
  "message": "Internal server error"
}
```
### Rides

#### `GET /rides/get-fare`

Retrieves the fare and distance for a ride.

*   **Authentication:** `authMiddleware.authUser`
*   **Query Parameters:**
    *   `pickup`: (Required) String, minimum 3 characters.
    *   `destination`: (Required) String, minimum 3 characters.

#### `POST /rides/confirm`

Confirms a ride and assigns a captain.

*   **Authentication:** `authMiddleware.authCaptain`
*   **Body (JSON):**
    *   `rideId`: (Required) MongoDB ObjectId of the ride.
    *   `captain`: (Required) ID of the captain.

#### `POST /rides/start-ride`

Starts a ride using OTP verification.

*   **Authentication:** `authMiddleware.authCaptain`
*   **Body (JSON):**
    *   `rideId`: (Required) MongoDB ObjectId of the ride.
    *   `otp`: (Required) 6-digit OTP.

#### `POST /rides/end-ride`

Ends a ride.

*   **Authentication:** `authMiddleware.authCaptain`
*   **Body (JSON):**
    *   `rideId`: (Required) MongoDB ObjectId of the ride.
