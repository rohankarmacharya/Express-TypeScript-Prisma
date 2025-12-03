# CRUD API with Express, TypeScript, and Prisma

A robust RESTful API built with Express.js, TypeScript, and Prisma, featuring full CRUD operations for user management.

## 🚀 Features

- **User Management**: Create, Read, Update, and Delete users
- **TypeScript**: Type-safe codebase
- **Prisma ORM**: Type-safe database client
- **PostgreSQL**: Relational database
- **Environment Configuration**: Secure configuration management

## 📋 Prerequisites

- Node.js (v16 or higher)
- PostgreSQL (v12 or higher)
- npm or yarn

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd CRUD_api
   Install dependencies
   bash
   npm install
   ```

# or

yarn
Set up environment variables
Create a
.env
file in the root directory
Add your database connection string:
DATABASE_URL="postgresql://username:password@localhost:5432/crud_api?schema=public"
Set up the database
Make sure PostgreSQL is running
Create a new database named crud_api
Run database migrations
bash
npx prisma migrate dev --name init
🚦 Running the Application
Development mode:

bash
npm run dev

# or

yarn dev
The server will start on http://localhost:3000

🌐 API Endpoints
Users
POST /users - Create a new user
GET /users - Get all users
GET /users/:id - Get a specific user
PUT /users/:id - Update a user
DELETE /users/:id - Delete a user
📝 Example Requests
Create User
http
POST /users
Content-Type: application/json

{
"name": "John Doe",
"age": 30,
"email": "john@example.com",
"password": "securepassword123"
}
Get All Users
http
GET /users
Get User by ID
http
GET /users/1
Update User
http
PUT /users/1
Content-Type: application/json

{
"name": "John Smith",
"age": 31
}
Delete User
http
DELETE /users/1
🐛 Common Issues & Solutions
Database Connection Issues
Ensure PostgreSQL is running
Verify your
.env
file has the correct database credentials
Check if the database exists and is accessible
Prisma Client Errors
If you modify the Prisma schema, run:
bash
npx prisma generate
TypeScript Errors
Ensure all TypeScript types are correctly defined
Run type checking with:
bash
npx tsc --noEmit
Port Already in Use
Change the PORT in
src/index.ts
if the default port (3000) is in use
🔧 Project Structure
CRUD_api/
├── prisma/
│ └── schema.prisma # Database schema
├── src/
│ ├── prisma.ts # Prisma client setup
│ ├── index.ts # Application entry point
│ └── routes/
│ └── userRoutes.ts # User routes
├── .env # Environment variables
├── package.json # Dependencies and scripts
└── tsconfig.json # TypeScript configuration
📦 Dependencies
Main Dependencies
Express.js - Web framework
Prisma - ORM for database operations
PostgreSQL - Database
TypeScript - Type checking
dotenv - Environment variable management
Development Dependencies
@types/express - TypeScript types for Express
@types/node - TypeScript types for Node.js
ts-node-dev - Development server with hot-reload
TypeScript - TypeScript compiler
📄 License
This project is licensed under the MIT License - see the LICENSE file for details.

🙏 Acknowledgments
Thanks to the Express, TypeScript, and Prisma communities
Inspired by modern API development practices
