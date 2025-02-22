📋 Task Management Application - Backend
This is the backend of the Task Management Application built with Node.js, Express.js, and MongoDB. It provides a RESTful API for managing tasks, including features like creating, updating, deleting, and fetching tasks.

🚀 Features
➕ Create Tasks (with title, description, status, and due date)
📥 Get All Tasks
🔄 Update Tasks (mark as completed, update details)
❌ Delete Tasks
📅 Set Deadlines for Tasks
🕒 Timestamps (track creation and update times)
🛠️ Tech Stack
Node.js - JavaScript runtime
Express.js - Server framework
MongoDB - NoSQL database
Mongoose - ODM for MongoDB
Dotenv - Environment variable management
Cors - Enable CORS for cross-origin requests
⚙️ Installation & Setup
Prerequisites:
Node.js and npm installed
A running instance of MongoDB (local or MongoDB Atlas)
Steps:
Clone the Repository

bash
Copy
Edit
git clone https://github.com/your-username/task-management-backend.git
cd task-management-backend
Install Dependencies

bash
Copy
Edit
npm install
Configure Environment Variables

Create a .env file in the root directory and add:

ini
Copy
Edit
MONGO_URI=your_mongodb_connection_string
PORT=5000
Run the Server

bash
Copy
Edit
npm run dev
The server will run on http://localhost:5000.

📄 API Endpoints
Task Routes
Method Endpoint Description
GET /api/tasks Fetch all tasks
POST /api/tasks Create a new task
PUT /api/tasks/:id Update an existing task
DELETE /api/tasks/:id Delete a task by ID
Example Task JSON:
json
Copy
Edit
{
"title": "Finish the project",
"description": "Complete the backend for the task manager app",
"status": "pending",
"dueDate": "2025-02-28T23:59:59Z"
}
🔐 Environment Variables
Variable Description
MONGO_URI Your MongoDB connection string
PORT Port number for the server (default: 5000)
🧑‍💻 Contributing
Fork the repository
Create a new branch (git checkout -b feature-branch)
Commit your changes (git commit -m 'Add new feature')
Push to the branch (git push origin feature-branch)
Create a pull request
📜 License
This project is licensed under the MIT License.
