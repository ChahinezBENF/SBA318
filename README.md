# CHAHINEZ Employee Management System

A simple Node.js/Express web application to manage employees, departments, and roles using EJS as the templating engine.

## 🌟 Features

- View, search by (ID, First Name, Last Name, Role, Department), add, update, and delete employees
- Department and role views
- Fully functional forms with method override for `PUT` and `DELETE` operations
- Server-side rendering with EJS
- Lightweight data storage using local `.js` files

## 🛠️ Tech Stack

- **Backend:** Node.js, Express.js
- **Templating:** EJS
- **Frontend:** html, CSS
- **Data Storage:** JavaScript objects saved to `.js` files (employees.js, departments.js, roles.js )
- **Middleware:**
  - `method-override` – to enable PUT and DELETE in forms
  - `body-parser` – for parsing request bodies
  - `express.urlencoded()` – for parsing form data
  - `express.json()` – for parsing JSON payloads

## 📂 Project Structure
- **data/:**
  - employees.js       # File-based storage for employees (http://localhost:3000/employees)
  - departments.js     # File-based storage for departments (http://localhost:3000/departments)
  - roles.js           # File-based storage for roles (http://localhost:3000/roles)
- **routes/:**
  - employees.js       # Routes for employee operations
  - departments.js     # Routes for department operations
  - roles.js           # Routes for role operations
- **views/:**
  - employees.ejs      # Main employee list view (http://localhost:3000/employees/view)
  - addEmployee.ejs    # Form for adding an employee (http://localhost:3000/employees/add?)
  - updateEmployee.ejs # Form for updating an employee (http://localhost:3000/employees/update/1?)
  - index.ejs          # Home page (http://localhost:3000/)
  - roles.ejs          # Main rols list view (http://localhost:3000/roles/view)
  - departments.ejs    # Main edepartments list view (http://localhost:3000/departments/view)
- **public/:**
  - css/               # CSS styles
- **index.js**               # Entry point of the application
- **README.md**              # Project documentation


---

## ✅ Requirement Fulfillment

- **1. Two custom middleware functions:**
  - **Logging Middleware**: Logs every request.
    ```js
    app.use((req, res, next) => {
      console.log(`[LOG] ${req.method} request to ${req.url}`);
      next();
    });
    ```
  - **Timestamp Middleware**: Attaches request time to every request.
    ```js
    app.use((req, res, next) => {
      req.requestTime = new Date().toISOString();
      next();
    });
    ```

- **2. Error-handling middleware:**
  - Handles unexpected server errors.
    ```js
    app.use((err, req, res, next) => {
      console.error('[ERROR]', err.stack);
      res.status(500).send('Internal Server Error. Please try again later.');
    });
    ```

- **3. Three data categories:**
  - `employees`, `departments`, and `roles` – each stored in its own file and accessible via routes.

- **4. Good data structuring practices:**
  - Modular folder organization (`routes/`, `data/`, `views/`, `public/`) with separation of concerns.

- **5. GET routes for client access:**
  - `GET /employees` – JSON of all employees  
  - `GET /departments` – JSON of all departments  
  - `GET /roles` – JSON of all roles  
  - `GET /employees/view`, `/roles/view`, `/departments/view` – Rendered HTML views  
  - `GET /employees/:id` – Specific employee details as JSON  
  - `GET /employees/update/:id` – Pre-filled update form  
  - `GET /` – Home page

- **6. POST routes for data creation:**
  - `POST /employees` – Allows adding new employees via form submission.

- **7. PUT route for data updates:**
  - `PUT /employees/:id` – Updates employee data using a form and method override:
    ```js
    <form action="/employees/<%= employee.id %>?_method=PUT" method="POST">
    ```

- **8. DELETE route for data removal:**
  - `DELETE /employees/:id` – Deletes employee data using a form and method override:
    ```js
    <form action="/employees/<%= employee.id %>?_method=DELETE" method="POST">
    ```

- **9. Query parameters for filtering:**
  - `GET /employees/search?q=Developer` – Searches employees by first name, last name, role, or department using query parameters.

- **10. Route parameters used for dynamic operations:**
  - `/employees/:id` – View employee details  
  - `/employees/update/:id` – Load update form  
  - `/employees/:id` (PUT or DELETE) – Update or delete an employee

- **11. RESTful principles followed:**
  - Routes and HTTP methods align with REST standards (e.g., `GET`, `POST`, `PUT`, `DELETE` for standard CRUD).

- **12. Server-rendered views using EJS template engine:**
  - Dynamic data rendered in views like:
    - `employees.ejs`, `addEmployee.ejs`, `updateEmployee.ejs`
    - `roles.ejs`, `departments.ejs`, `index.ejs`

13. Static CSS Styling
CSS is served via Express static middleware

Stylesheets are in public/css/ and linked in views:
   ```js
   <link rel="stylesheet" href="/css/styles.css">
   ```
14. Interactive Forms in Views
addEmployee.ejs and updateEmployee.ejs contain forms that POST and PUT data to the API

15. Reasonable Code Organization ✅ 

16. Program Stability ✅ 

17. Git Commit Practices
Project includes frequent commit (over 6)

18. README File ✅ 

19. Level of Effort & Creativity ✅ 

---

## ✅ Bonus Objectives
1. Include a practical usage of regular expressions within route paths
```js
if (!/^[a-zA-Z]+$/.test(name)) {
  return res.status(400).send('Invalid name format. Only alphabetic characters are allowed.');
}
```
2. Use at least one third-party Node package for practical, sensible purposes: 
  - `method-override` 
  - `body-parser` 

---

## 🚀 Future Enhancements

Planned improvements to scale and enhance the CHAHINEZ Employee Management System:

### 🔐 Authentication & Authorization
- [ ] Implement user login/logout functionality
- [ ] Define user access levels (Admin, HR, Employee)
- [ ] Restrict route access based on role permissions

### 🗃️ Switch to Database Storage
- [ ] Replace file-based storage with a real database like MongoDB 
- [ ] Normalize the schema into relational tables for employees, departments, and roles
- [ ] Use data modeling 

### 📊 Dashboard & Analytics
- [ ] Create a visual dashboard showing:
  - [ ] Total employees
  - [ ] Average salary
  - [ ] Number of employees per department
- [ ] Integrate interactive graphs 
- [ ] Add filters to view analytics by department, role, or date

### ✅ Form Validation & Format Requirements
- [ ] **Date of Birth (DOB)**
  - [ ] Cannot be in the future
  - [ ] Employee must be at least 16 years old
- [ ] **Hire Date**
  - [ ] Cannot precede the DOB
  - [ ] Cannot be in the future
- [ ] **Department & Role**
  - [ ] Use dropdowns populated from the database
