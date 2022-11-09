import { Sequelize } from "sequelize";
 
const db = new Sequelize('advpro', 'root', '', {
    host: "localhost",
    dialect: "mysql"
});
 
export default db;