# Fullstack Assesment

## Features

-   **Responsive UI:** Implements a responsive layout with a sidebar, top navigation, and a main content area.
-   **Student Management:**
    -   List of students displayed in a table with details.
    -   Add new students via a dialog form.
    -   Edit existing students.
    -   Delete students with a confirmation dialog.
-   **State Management:** Uses Zustand for global state management of student data.
-   **API Integration:** CRUD operations performed via Next.js API routes connecting to a Supabase database through Prisma ORM.
-   **Form Validation:** Ensures all required fields are filled before submission.
-   **Loading Indicators:** Displays loading spinners during data fetching and updates.
-   **Notifications:** Uses `react-toastify` for displaying success and error messages.
-   **Error Handling:** Gracefully handles errors and provides user feedback.

----------
## Testing the Endpoints

You can test the API endpoints using tools like Postman or cURL, as well as through the application's UI.

### Using Postman

**1. Install Postman:**

Download and install Postman from the [official website](https://www.postman.com/downloads/).

**2. Set Up Environment Variables (Optional):**

If you prefer, set up environment variables in Postman for base URLs and API endpoints.

**3. Test the Endpoints:**

-   **GET All Students**
    
    -   **Method:** GET
    -   **URL:** `https://fullstack-assessment-git-master-darkboy17s-projects.vercel.app/api/students`
    -   **Description:** Retrieves a list of all students.
-   **POST Create a New Student**
    
    -   **Method:** POST
    -   **URL:** `https://fullstack-assessment-git-master-darkboy17s-projects.vercel.app/api/students/create`
    -   **Body:** JSON
        
		```json
		{
		  "name": "John Doe",
		  "email": "john.doe@example.com",
		  "cohort": "AY 2024-25",
		  "courses": ["Course 1", "Course 2"],
		  "date_joined": "2024-11-17T00:00:00.000Z",
		  "status": true
		}
    -   **Description:** Adds a new student to the database.
-   **PUT Update an Existing Student**
    
    -   **Method:** PUT
    -   **URL:** `http://localhost:3000/api/students/{id}`
    -   **Body:** JSON

		```json
		{
		  "name": "John Doe Updated",
		  "email": "john.doe@example.com",
		  "cohort": "AY 2024-25",
		  "courses": ["Course 1", "Course 3"],
		  "date_joined": "2024-11-17T00:00:00.000Z",
		  "status": true
		}
    -   **Description:** Updates the details of an existing student.
-   **DELETE a Student**
    
    -   **Method:** DELETE
    -   **URL:** `http://localhost:3000/api/students/{id}`
    -   **Description:** Deletes a student by ID.

**4. Check Responses:**

-   Verify the responses from the API are as expected.
-   Handle any errors that might occur.

### Using cURL

You can also test the API endpoints using cURL commands in your terminal.

-   **GET All Students**
    
    BASH
    

-   `curl -X GET https://fullstack-assessment-git-master-darkboy17s-projects.vercel.app/api/students`
    
-   **POST Create a New Student**
    
    BASH/ CMD
   
	```bash
	curl -X POST http://localhost:3000/api/students/create \
	-H "Content-Type: application/json" \
	  -d '{"name": "Jane Doe", "email": "jane.doe@example.com", 
	  "cohort": "AY 2024-25", "courses": ["Course A", "Course B"], 
	  "date_joined": "2024-11-17T00:00:00.000Z", "status": true}'
-   **PUT Update an Existing Student**
    
    BASH/CMD
    

```bash
curl -X PUT http://localhost:3000/api/students/{id} \
  -H "Content-Type: application/json" \
  -d '{"name": "Jane Doe Updated", "email": "jane.doe@example.com",
		"cohort": "AY 2024-25","courses": ["Course A", "Course C"],
		"date_joined": "2024-11-17T00:00:00.000Z","status": true}'
```
    
-   **DELETE a Student**
    
    BASH/CMD
    
	`curl -X DELETE http://localhost:3000/api/students/{id}`
    

### Testing via the UI

The application provides a user-friendly interface to interact with the student data.

**1. Access the Application:**

Open your browser and navigate to `https://fullstack-assessment-git-master-darkboy17s-projects.vercel.app/`.

**3. Interact with the Application:**

-   **View Students:**
    
    -   The main page displays a table of students with their details.
-   **Add a New Student:**
    
    -   Click on the "+ Add new Student" button.
    -   Fill in the form with the student's details.
    -   Submit the form to add the student.
-   **Edit an Existing Student:**
    
    -   Click on a student's row in the table.
    -   An "Edit" and "Delete" option will appear.
    -   Click "Edit" to open the edit dialog.
    -   Modify the student's details and save changes.
-   **Delete a Student:**
    
    -   Click on a student's row in the table.
    -   Click "Delete" to open a confirmation dialog.
    -   Confirm the deletion to remove the student from the database.

**4. Observe Changes:**

-   The table will update automatically to reflect any additions, edits, or deletions.
-   Notifications will appear to confirm successful actions or display error messages.

**5. Error Handling:**

-   If an error occurs (e.g., trying to add a student with an existing email), an error message will be displayed.
-   Ensure all required fields are filled out when adding or editing a student.

----------

## API Endpoints

Below is a summary of the API endpoints available in the application.

| Method | Endpoint              | Description                  |
|--------|-----------------------|------------------------------|
| GET    | /api/students         | Retrieve all students        |
| GET    | /api/students/{id}    | Get a single student by ID   |
| POST   | /api/students/create  | Add a new student            |
| PUT    | /api/students/{id}    | Update an existing student   |
| DELETE | /api/students/{id}    | Delete a student by ID       |
