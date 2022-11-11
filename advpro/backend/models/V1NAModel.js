import { Sequelize } from "sequelize";
import db from "../config/Database.js";
 
const { DataTypes } = Sequelize;
 
const V1GM = db.define('v1g_monthly',{
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
 
export default V1GM;