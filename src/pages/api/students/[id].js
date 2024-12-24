import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  const { id } = req.query; // Extract the id from the query parameters

  if (req.method === "PUT") {
    try {
      // Extract data from the request body
      const { name, email, cohort, courses, date_joined, last_login, status } =
        req.body;

      // Validate and format the date fields
      const formattedDateJoined = date_joined
        ? new Date(date_joined)
        : undefined;
      const formattedLastLogin = last_login ? new Date(last_login) : undefined;

      // Update the student record
      const student = await prisma.student.update({
        where: { id: id }, // Use the id directly as a string
        data: {
          name,
          email,
          cohort,
          courses,
          date_joined: formattedDateJoined,
          last_login: formattedLastLogin,
          status,
        },
      });

      res.status(201).json({
        message: "Student data successfully updated",
        student: student,
      });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  } else if (req.method === "GET") {
    try {
      const student = await prisma.student.findUnique({
        where: { id: id }, // Use the id directly as a string
      });

      if (student) {
        res.status(200).json(student);
      } else {
        res.status(404).json({ message: "Student not found" });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  } else if (req.method === "DELETE") {
    try {
      // Attempt to delete the student

      const student = await prisma.student.delete({
        where: { id: id }, // Use the id directly as a string
      });

      res
        .status(200)
        .json({ message: `Student with ID ${id} successfully deleted.` });
    } catch (error) {
      if (error.code === "P2025") {
        // Prisma error code for "Record to delete does not exist."

        res
          .status(404)
          .json({ message: `Student with ID ${id} does not exist.` });
      } else {
        res.status(500).json({
          message: "An error occurred while trying to delete the student.",
        });
      }
    }
  } else {
    res.setHeader("Allow", ["PUT"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
