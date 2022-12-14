import V3a from "../models/V3aModel.js";
import V3m from "../models/V3mModel.js";
import V41 from "../models/V41Model.js";
import V42 from "../models/V42Model.js";
import V43 from "../models/V43Model.js";

export const getV3a = async(req, res) => {
    try {
        const v3a = await V3a.findAll({
            attributes:['year','mean']
        });
        res.json(v3a);
    } catch (error) {
        console.log(error);
    }
}
export const getV3m = async(req, res) => {
    try {
        const v3m = await V3m.findAll({
            attributes:['date','average']
        });
        res.json(v3m);
    } catch (error) {
        console.log(error);
    }
}
export const getV41 = async(req, res) => {
    try {
        const v41 = await V41.findAll({
            attributes:['year','co2']
        });
        res.json(v41);
    } catch (error) {
        console.log(error);
    }
}
export const getV42 = async(req, res) => {
    try {
        const v42 = await V42.findAll({
            attributes:['year','co2']
        });
        res.json(v42);
    } catch (error) {
        console.log(error);
    }
}
export const getV43 = async(req, res) => {
    try {
        const v43 = await V43.findAll({
            attributes:['year','co2']
        });
        res.json(v43);
    } catch (error) {
        console.log(error);
    }
}