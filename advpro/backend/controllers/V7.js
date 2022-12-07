import V71 from "../models/V71Model.js";
import V72 from "../models/V72Model.js";

export const getV71 = async(req, res) => {
    try {
        const v71 = await V71.findAll({
            attributes:['time','temp']
        });
        res.json(v71);
    } catch (error) {
        console.log(error);
    }
}
export const getV72 = async(req, res) => {
    try {
        const v72 = await V72.findAll({
            attributes:['time','co2']
        });
        res.json(v72);
    } catch (error) {
        console.log(error);
    }
}