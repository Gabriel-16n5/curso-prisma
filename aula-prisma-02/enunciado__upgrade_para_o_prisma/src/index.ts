import prisma from "./database/database";

(async () => {
  const result = await prisma.users.findMany();

  const users = result;
  console.log("users encontrados no banco:", users);
})();