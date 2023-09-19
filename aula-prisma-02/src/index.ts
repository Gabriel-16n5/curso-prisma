import prisma from "../database";

async function find() {
    const users = await prisma.users.findMany();

    return users;
}

(async () => {
    
    const users = await find();
    console.log(users)
})()