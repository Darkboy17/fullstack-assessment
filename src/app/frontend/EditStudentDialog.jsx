// components/EditStudentDialog.js
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";

const EditStudentDialog = ({ isOpen, onClose, studentData, onSave }) => {
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [cohort, setCohort] = useState("");
  const [courses, setCourses] = useState("");
  const [dateJoined, setDateJoined] = useState("");
  const [lastLogin, setLastLogin] = useState("");
  const [status, setStatus] = useState(true);

  useEffect(() => {
    if (studentData) {
      setId(studentData.id);
      setName(studentData.name);
      setEmail(studentData.email);
      setCohort(studentData.cohort);
      setCourses(studentData.courses.join(", "));
      setDateJoined(studentData.date_joined.split("T")[0]);
      setLastLogin(studentData.last_login);
      setStatus(studentData.status);
    }
  }, [studentData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedStudent = {
      id,
      name,
      email,
      cohort,
      courses: courses.split(",").map((course) => course.trim()),
      date_joined: new Date(dateJoined).toISOString(),
      lastLogin,
      status,
    };

    onSave(updatedStudent);

    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4">Edit Student</h2>
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
          <input
            type="date"
            placeholder="Date Joined"
            value={dateJoined}
            onChange={(e) => setDateJoined(e.target.value)}
            className="w-full p-2 mb-2 border rounded"
            required
          />
          <input
            type="text"
            placeholder="Last Login"
            value={lastLogin}
            readOnly
            className="w-full p-2 mb-2 border rounded bg-gray-100"
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
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditStudentDialog;
