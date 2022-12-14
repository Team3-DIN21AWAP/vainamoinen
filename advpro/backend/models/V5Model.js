import { Sequelize } from "sequelize";
import db from "../config/Database.js";
 
const { DataTypes } = Sequelize;
 
const V5 = db.define('V5',{
    ageofair:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    CO2concentration:{
        type: DataTypes.DOUBLE,
        allowNull: false

    }
},{
    freezeTableName:true
});
 
(async () => {
    await db.sync();
})();
 
export default V5;