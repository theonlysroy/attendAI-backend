<h1 align="center">attendAI-backend</h1>

## 📝 Features

- Student Registration
- Student Login with Face Recognition
- Easy logout
- Admin Facilities (`under development`)
- Attendance Management
- Performance reports
- Notice views
- Student Profile
- Student ID card download

## ❗ Requirements

- [Node.js](https://nodejs.org/en/)
- [MongoDB](https://www.mongodb.com/)

## 📦 Installation

- Install mongodb [guide](https://www.mongodb.com/docs/manual/installation/)
- Start mongodb.

```bash
$ mongod
# or
$ sudo systemctl start mongod       # for linux
```

- Clone this repository or download as a zip file.

```bash
$ git clone https://github.com/theonlysroy/attendAI-backend.git
$ cd attendAI-backend
```

- Install dependencies.

```bash
$ npm install
```

- Start the server.

```bash
$ npm run dev
```

- In the .env file, set the following variables.

```bash
PORT=8000
MONGODB_URI=mongodb://127.0.0.1:27017
DB_NAME=<your-database-name>
CORS_ORIGIN=http://localhost:5137
TF_CPP_MIN_LOG_LEVEL=2
TF_ENABLE_ONEDNN_OPTS=1
ACCESS_TOKEN_SECRET=<your-secret-key>
ACCESS_TOKEN_EXPIRY=<your-token-expiry-time>
```

## 🚀 Usage

### 1. Student Registration

Go to `http://localhost:8000/auth/register` and register a student with the required information.

### 2. Student Login with Face Recognition

Go to `http://localhost:8000/auth/login` and login with the student's face recognition.

### 3. Dashboard

After login, you'll be redirected to the dashboard. Here you can see the student's attendance, performance reports, and notice views.

---

## 📝 Author

👤 **Swagatam Roy**

- <i class="fa-brands fa-github"></i> [@theonlysroy](https://github.com/theonlysroy)
- <i class="fa-brands fa-linkedin"></i> [Swagatam Roy](https://www.linkedin.com/in/swagatam-roy/)

---
