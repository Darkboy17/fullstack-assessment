import { convertTimeToISOFormat, getRandomTime } from "@/utils/formatDate";
import React, { useState } from "react";
import { toast } from "react-toastify";

const AddStudentDialog = ({ isOpen, onClose }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [cohort, setCohort] = useState("");
  const [courses, setCourses] = useState("");
  const [dateJoined, setDateJoined] = useState("");
  const time = getRandomTime();
  const [lastLogin, setLastLogin] = useState(time.split(" ")[0]);
  const [status, setStatus] = useState(true);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const dateAndTime = dateJoined.split("T")[0] + convertTimeToISOFormat(time);

    const newStudent = {
      name,
      email,
      cohort,
      courses: courses.split(",").map((course) => course.trim()),
      date_joined: dateAndTime,
      last_login: dateAndTime,
      status,
    };

    try {
      const response = await fetch("/api/students/create", {
        method: "POST",

        headers: { "Content-Type": "application/json" },

        body: JSON.stringify(newStudent),
      });

      if (response.ok) {
        toast.success("Student added successfully!");
        onClose();
      } else {
        const errorData = await response.json(); // Parse the error response

        toast.error(errorData.message); // Display the error message
      }
    } catch (error) {
      console.error("Error adding student:", error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4">Add New Student</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 mb-2 border rounded"
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 mb-2 border rounded"
            required
          />
          <input
            type="text"
            placeholder="Cohort"
            value={cohort}
            onChange={(e) => setCohort(e.target.value)}
            className="w-full p-2 mb-2 border rounded"
            required
          />
          <input
            type="text"
            placeholder="Courses (comma separated)"
            value={courses}
            onChange={(e) => setCourses(e.target.value)}
            className="w-full p-2 mb-2 border rounded"
            required
          />
          <span className="text-gray-400">Date Joined</span>
          <input
            type="date"
            placeholder="Date Joined"
            value={dateJoined}
            onChange={(e) => setDateJoined(e.target.value)}
            className="w-full p-2 mb-2 border rounded"
            required
          />
          <span className="text-gray-400">Last Login</span>
          <input
            type="time"
            readOnly
            placeholder="Last Login"
            value={lastLogin}
            onChange={(e) => setLastLogin(e.target.value)}
            className="w-full p-2 mb-2 border rounded"
            required
          />

          <div className="flex items-center mb-4">
            <input
              type="checkbox"
              checked={status}
              onChange={(e) => setStatus(e.target.checked)}
              className="mr-2"
            />
            <label>Status Active</label>
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Add Student
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddStudentDialog;
