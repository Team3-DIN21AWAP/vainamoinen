import { Sequelize } from "sequelize";
import db from "../config/Database.js";
 
const { DataTypes } = Sequelize;
 
const V41 = db.define('V41',{
    year:{
        type:  DataTypes.DATE,
        allowNull: false
    },
    co2:{
        type: DataTypes.DOUBLE,
        allowNull: false

    }
},{
    freezeTableName:true
});
 
(async () => {
    await db.sync();
})();
 
export default V41;