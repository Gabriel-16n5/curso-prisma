import prisma from "../src/database";

main().then(async () => {
    await prisma.$disconnect();
}).catch(async (error) =>{
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
})

async function checkOrCreateDefaultDatena() {
    return await prisma.customer.upsert({
        create: {
            firstName: "Geraldo",
            lastName: "Luiz Datena",
            document: "133.245.497-60"
        },
        update: {},
        where: {
            document: "133.245.497-60"
        }
    })
}

async function main() {
    return checkOrCreateDefaultDatena()
}

