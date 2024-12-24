import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  
  if (req.method === "POST") {
    try {
      // Clean the email
      const cleanEmail = req.body.email.trim();

      // Check for existing student using raw query
      const existingStudents = await prisma.$queryRaw`
        SELECT id FROM students WHERE email = ${cleanEmail} LIMIT 1
      `;

      if (existingStudents.length > 0) {
        return res.status(409).json({
          message: "Student with this email already exists",
        });
      }

      // If student doesn't exist, create new student
      const student = await prisma.student.create({
        data: {
          name: req.body.name,
          email: cleanEmail,
          cohort: req.body.cohort,
          courses: req.body.courses,
          date_joined: new Date(req.body.date_joined),
          last_login: req.body.last_login
            ? new Date(req.body.last_login)
            : null,
          status: req.body.status,
        },
      });

      res.status(201).json({
        message: "Student successfully created",
        student: student,
      });
    } catch (error) {
      console.error("Error:", error);
      res.status(400).json({ error: error.message });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
