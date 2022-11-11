import { Sequelize } from "sequelize";
import db from "../config/Database.js";
 
const { DataTypes } = Sequelize;
 
const V1NM = db.define('v1n_monthly',{
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
 
export default V1NM;