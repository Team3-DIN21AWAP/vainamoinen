import { Sequelize } from "sequelize";
import db from "../config/Database.js";
 
const { DataTypes } = Sequelize;
 
const V10 = db.define('V10',{
    year:{
        type: DataTypes.DATE,
        allowNull: false
    },
    event:{
        type: DataTypes.TEXT,
        allowNull: false

    }
},{
    freezeTableName:true
});
 
(async () => {
    await db.sync();
})();
 
export default V10;