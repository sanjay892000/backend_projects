# UberApp Backend

This is the backend for the UberApp project, built with Node.js, Express, and MongoDB.

---

## 📁 Project Structure

```
backend/
│
├── app.js
├── server.js
├── database.js
├── package.json
├── .env
│
├── controllers/
│   └── user.controller.js
├── middleware/
├── models/
│   └── user.model.js
├── public/
├── router/
│   └── user.routes.js
├── services/
│   └── user.service.js
```

---

## 🚀 Getting Started

1. **Install dependencies**
   ```sh
   npm install
   ```

2. **Set up environment variables**  
   Edit the `.env` file with your MongoDB URI and JWT secret.

3. **Run the server**
   ```sh
   npm run start
   ```

---

## 📝 Registration Workflow

### Endpoint

```
POST /uber/api/v3.2/auth/register
```

### Step-by-Step Process

1. **Client Request**
   - Client sends a POST request to `/uber/api/v3.2/auth/register` with the following JSON body:
     ```json
     {
       "firstname": "John",
       "lastname": "Doe",
       "email": "john@example.com",
       "age": 25,
       "password": "yourpassword"
     }
     ```

2. **Validation**
   - The request body is validated using `express-validator`:
     - `firstname`: at least 3 characters
     - `email`: must be a valid email
     - `age`: required, between 18 and 50
     - `password`: required

3. **Controller Logic** ([controllers/user.controller.js](controllers/user.controller.js))
   - Checks if the email already exists in the database.
   - If exists, returns an error: `Email already exists!`
   - If not, hashes the password using [`userModel.hashPassword`](models/user.model.js).

4. **Service Layer** ([services/user.service.js](services/user.service.js))
   - Calls [`registerService`](services/user.service.js) to create a new user in the database with the provided details.

5. **Token Generation**
   - After successful registration, generates a JWT token using [`user.generateAuthToken`](models/user.model.js).

6. **Response**
   - Returns a JSON response:
     ```json
     {
       "success": true,
       "user": { ...userData },
       "token": "JWT_TOKEN",
       "message": "User created successfully!"
     }
     ```

---

## 📚 Notes

- Passwords are hashed before saving to the database.
- JWT token is returned for authentication.
- All sensitive data (like passwords) are not exposed in API responses.


## 📝 Login Workflow

### Endpoint

```
POST /uber/api/v3.2/auth/login
```

### Step-by-Step Process

1. **Client Request**
   - Client sends a POST request to `/auth/login` with the following JSON body:
     ```json
     {
       "email": "john@example.com",
       "password": "yourpassword"
     }
     ```

2. **Validation**
   - The request body is validated using `express-validator`:
     - `email`: required, must be a valid email
     - `password`: required

3. **Controller Logic** ([controllers/user.controller.js](controllers/user.controller.js))
   - Checks if the user with the provided email exists.
   - If not, returns an error: `Invalid email or password`.
   - If user exists, compares the provided password with the hashed password in the database.
   - If the password does not match, returns an error: `Invalid email or password`.

4. **Token Generation**
   - On successful authentication, generates a JWT token using [`user.generateAuthToken`](models/user.model.js).

5. **Response**
   - Returns a JSON response:
     ```json
     {
       "success": true,
       "user": { ...userData },
       "token": "JWT_TOKEN",
       "message": "Logged in successfully!"
     }
     ```



## 👨‍💻 Author

- Sanjay Singh