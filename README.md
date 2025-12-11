SecureHub is a full-stack web application designed to demonstrate the principles of Zero Trust Architecture using a modern web technology stack. The project includes user authentication with JWT, role-based access control (RBAC), session timeout logic, protected backend routes, and an audit logging system.

The application is divided into two main parts:

1) Frontend: Next.js 14 (App Router)
2) Backend: Node.js with Express.js

Both components work together to enforce the Zero Trust model, where every request is authenticated and authorized based on user roles and issued tokens.

Project Structure
zerotrust/
backend/ - Node.js Express API (authentication, RBAC, audit logs)
frontend/ - Next.js client application (protected routes, dashboards)

Technology Overview:
Frontend uses Next.js with the App Router, React, TailwindCSS for styling, and Axios for communication with the backend.
Backend uses Node.js, Express, JWT for authentication, custom RBAC middleware, and an in-memory data layer for users and audit logs.

This setup allows the project to remain simple enough for educational purposes but still realistic in terms of architecture and security logic.

The project demonstrates the following Zero Trust principles:

Authentication is required for every request that accesses protected resources.
Authorization is enforced through role-based access control (admin, manager, employee).
No user receives more privileges than necessary.
Sessions expire automatically after a period of inactivity.
Audit logs record important security events, such as logins and forbidden access attempts.
All protected areas of the frontend validate the token before rendering content.

Installation and Setup: 

Clone the Repository
git clone https://github.com/k1yotakka/zerotrust.git
cd zerotrust

-----------------------------------------
Backend Setup
Navigate into the backend folder:
cd backend

Install dependencies:
npm install

Create a .env file:
JWT_SECRET=supersecretkey
PORT=4000

Start the backend server:
npm run dev
The backend will run at:
http://localhost:4000

--------------------------------------------
Frontend Setup

Navigate into the frontend folder:
cd frontend

Install dependencies:
npm install

Start the development server:
npm run dev

The frontend will be available at:
http://localhost:3000

--------------------------------------------

Authentication and Roles
The application uses JWT for authentication. Tokens expire after fifteen minutes, and the frontend also enforces a client-side inactivity timeout.
Users in this project have three possible roles: admin, manager, employee

Each role grants access to different dashboards and API endpoints. The system ensures that each user can only access the information and pages appropriate for their role.

Protected Pages
The frontend contains separate dashboard pages depending on user roles:
/dashboard/user – employee dashboard
/dashboard/manager – manager dashboard
/dashboard/admin – admin dashboard
/dashboard/admin/logs - audit log viewer
All of these pages are wrapped in a ProtectedRoute component that checks the validity of the JWT and enforces session timeout rules.

API Overview
The backend exposes the following API endpoints:

Authentication
POST /api/auth/register
POST /api/auth/login

User Account
GET /api/account/me

Protected Dashboard
GET /api/protected/dashboard

Administration
GET /api/admin/users
PATCH /api/admin/users/:id
GET /api/admin/auditLogs

All protected requests require the header:
Authorization: Bearer token

Audit Logging
The backend records important security events such as: user logins, attempts to access forbidden resources, administrative actions
Audit logs are stored in memory for this project and retrieved through the admin endpoint /api/admin/auditLogs.
