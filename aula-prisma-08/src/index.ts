import prisma from "./database";

async function studentsClass( ) {
  const result = await prisma.student.groupBy({
    by : ["class"],
    _count: {
      id: true
    },
    orderBy: {class: "desc"}
  })
  return result
}

async function studentsSad( ) {
  const result = await prisma.student.groupBy({
    by: ["class"],
    where: {
      jobId: null
    },
    _count:{
      class: true,
    },
    orderBy: {
      _count: {class: "desc"}
    }
  })
  return result
}

(async () => {
  const students = await studentsClass()
  console.log(students);
  const desempregado = await studentsSad()
  console.log(desempregado);
})()