import { Sequelize } from "sequelize";
import db from "../config/Database.js";
 
const { DataTypes } = Sequelize;
 
const V1SA = db.define('v1s_annual',{
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
 
export default V1SA;