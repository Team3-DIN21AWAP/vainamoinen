import { Sequelize } from "sequelize";
import db from "../config/Database.js";
 
const { DataTypes } = Sequelize;
 
const V1GA = db.define('v1g_annual',{
    time:{
        type: DataTypes.DATE,
        allowNull: false
    },
    anomalyC:{
        type: DataTypes.DOUBLE,
        allowNull: false

    }
},{
    freezeTableName:true
});
 
(async () => {
    await db.sync();
})();
 
export default V1GA;