import { Sequelize } from "sequelize";
import db from "../config/Database.js";
 
const { DataTypes } = Sequelize;
 

const V6 = db.define('V6',{
    ageofgasBP:{
        type: DataTypes.DOUBLE,
        allowNull: false
    },
    CO2ppm:{
        type: DataTypes.DOUBLE,
        allowNull: false

    }
},{
    freezeTableName:true
});
 
(async () => {
    await db.sync();
})();
 
export default V6;