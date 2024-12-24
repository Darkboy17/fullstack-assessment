"use client";

import useStore from "../../../store/useStore";
import { formatDate } from "../../utils/formatDate";
import AddStudentDialog from "./AddStudentDialog";
import React, { useState, useEffect } from "react";
import EditStudentDialog from "./EditStudentDialog";
import { toast } from "react-toastify";
import DeleteStudentDialog from "./DeleteStudentDialog";

const StudentTable = () => {
  const { students, setStudents } = useStore();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [loadingIds, setLoadingIds] = useState(new Set());
  const [expandedRow, setExpandedRow] = useState(null);

  const toggleRow = (studentId) => {
    setExpandedRow((prev) => (prev === studentId ? null : studentId));
  };

  const handleRowClick = (student) => {
    setSelectedStudent(student);

    setExpandedRow(student.id);

    setIsEditDialogOpen(true);
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(`/api/students/${selectedStudent.id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        const successData = await response.json();
        setIsDeleteDialogOpen(false); // Close the dialog immediately
        setStudents((prevStudents) =>
          prevStudents.filter((student) => student.id !== selectedStudent.id)
        );
        toast.success(successData.message);
        // Refresh the table by fetching the updated list of students

        const updatedResponse = await fetch("/api/students");

        const updatedData = await updatedResponse.json();

        setStudents(updatedData);
      } else {
        const errorData = await response.json();
        toast.error(errorData.message);
      }
    } catch (error) {
      toast.error("An error occurred while deleting the student.");
    }
  };

  const handleSave = async (updatedStudent) => {
    setLoadingIds((prev) => new Set(prev).add(updatedStudent.id));
    try {
      const response = await fetch(`/api/students/${updatedStudent.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedStudent),
      });

      if (response.ok) {
        const { student: updatedData } = await response.json(); // Access the nested student object
        console.log("Updated Data:", updatedData); // Debugging line
        setStudents((prevStudents) =>
          prevStudents.map((student) =>
            student.id === updatedData.id ? updatedData : student
          )
        );
        toast.success("Student updated successfully!");
      } else {
        const errorData = await response.json();
        toast.error(errorData.message);
      }
    } catch (error) {
      toast.error("An error occurred while updating the student.");
    } finally {
      setLoadingIds((prev) => {
        const newSet = new Set(prev);
        newSet.delete(updatedStudent.id);
        return newSet;
      });
      setIsEditDialogOpen(false);
    }
  };

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await fetch("/api/students");
        const data = await response.json();
        setStudents(
          data.map((student) => {
            const { joiningDate, lastLogin } = formatDate(student.date_joined);
            return {
              ...student,
              joiningDate,
              lastLogin,
            };
          })
        );
      } catch (error) {
        console.error("Failed to fetch students:", error);
      }
    };

    fetchStudents();
  }, [setStudents]);

  return (
    <div className="p-5 mt-0">
      <div className="p-4 rounded-xl bg-white">
        <div className="flex gap-4 mb-6 justify-between">
          <div className="flex gap-4">
            <select className="bg-gray-100 p-2 rounded-md text-gray-600 font-bold">
              <option>AY 2024-25</option>
            </select>
            <select className="bg-gray-100 text-gray-600 font-bold p-2 rounded-md">
              <option>CBSE 9</option>
            </select>
          </div>
          <div
            className="flex flex-row bg-gray-100 items-center p-2 gap-3 rounded-md cursor-pointer hover:cursor-pointer"
            onClick={() => setIsDialogOpen(true)}
          >
            <span
              className="w-4 h-4 bg-no-repeat bg-center bg-contain"
              style={{ backgroundImage: "url(/icons/plus.svg)" }}
              aria-label="Dashboard Icon"
            />
            <span className="text-gray-600 font-bold">Add new Student</span>
          </div>
        </div>

        <div className=" overflow-y-auto" style={{ maxHeight: "500px" }}>
          <table className="w-full bg-white rounded-md">
            <thead>
              <tr>
                <th className="text-left p-3">Student Name</th>
                <th className="text-left p-3">Cohort</th>
                <th className="text-left p-3">Courses</th>
                <th className="text-left p-3">Date Joined</th>
                <th className="text-left p-3">Last Login</th>
                <th className="text-left p-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => (
                <React.Fragment key={student.id}>
                  <tr
                    className="border-t hover:bg-gray-100 cursor-pointer"
                    onClick={() => toggleRow(student.id)}
                  >
                    <td className="p-3">{student.name}</td>
                    <td className="p-3">{student.cohort}</td>
                    <td className="p-3">{student.courses.join(", ")}</td>
                    <td className="p-3">{student.joiningDate}</td>
                    <td className="p-3">{student.lastLogin}</td>
                    <td className="p-3">
                      <span
                        className={`inline-block w-3 h-3 rounded-full ${
                          student.status === true
                            ? "bg-green-500"
                            : "bg-red-500"
                        }`}
                      ></span>
                    </td>
                  </tr>
                  {expandedRow === student.id && (
                    <tr>
                      <td colSpan="7" className="p-3">
                        <div className="flex justify-center gap-4">
                          <button
                            onClick={() => handleRowClick(student)}
                            className="text-blue-500 border-2 border-gray-500 rounded-lg p-1"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => {
                              setSelectedStudent(student);
                              setIsDeleteDialogOpen(true);
                            }}
                            className="text-red-500 border-2 border-gray-500 rounded-lg p-1"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
        <AddStudentDialog
          isOpen={isDialogOpen}
          onClose={() => setIsDialogOpen(false)}
        />
        <EditStudentDialog
          isOpen={isEditDialogOpen}
          onClose={() => setIsEditDialogOpen(false)}
          studentData={selectedStudent}
          onSave={handleSave}
        />
        <DeleteStudentDialog
          isOpen={isDeleteDialogOpen}
          onClose={() => setIsDeleteDialogOpen(false)}
          onDelete={handleDelete}
        />
      </div>
    </div>
  );
};

export default StudentTable;
