import { envs } from "../../config";
import { CategoryModel, MongoDatabase, ProductModel, UserModel } from "../mongo";
import { seedData } from "./data";


(async () => {

    // Inicialización de la base de datos
    await MongoDatabase.connect({
        dbName: envs.MONGO_DB_NAME,
        mongoUrl: envs.MONGO_URL
    });

    await main();

    await MongoDatabase.disconnect();
})();


const randomBetween0Andx = (x: number) => {
    return Math.floor(Math.random() * x);
}

async function main() {
    //1: Borrar toda la base de datos.
    await Promise.all([
        UserModel.deleteMany(),
        CategoryModel.deleteMany(),
        ProductModel.deleteMany(),
    ])

    //2: Crear  usuarios en la base de datos.
    const users = await UserModel.insertMany(seedData.users);

    //3: Crear  categorias en la base de datos.
    const categories = await CategoryModel.insertMany(
        seedData.categories.map(category => {
            return {
                ...category,
                user: users[0]._id
            }
        })

    );

    //4: Crear  productos en la base de datos.
    const products = await ProductModel.insertMany(
        seedData.products.map(product => {
            return {
                ...product,
                user: users[randomBetween0Andx(seedData.users.length - 1)]._id,
                category: categories[randomBetween0Andx(seedData.categories.length - 1)]._id,
            }
        })

    );


    console.log('SEEDED');



}
