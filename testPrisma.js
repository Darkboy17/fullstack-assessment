// testPrisma.js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  try {
    const students = await prisma.student.findMany();
    console.log(students);
  } catch (error) {
    console.error('Error fetching students:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main();