import V1GA from "../models/V1AModel.js";
import V1GM from "../models/V1GMModel.js";

export const getV1_GA = async(req, res) => {
    try {
        const v1_GA = await V1GA.findAll({
            attributes:['time','anomalyC']
        });
        res.json(v1_GA);
    } catch (error) {
        console.log(error);
    }
}
export const getV1_GM = async(req, res) => {
    try {
        const v1_GM = await V1GM.findAll({
            attributes:['time','anomalyC']
        });
        res.json(v1_GM);
    } catch (error) {
        console.log(error);
    }
}
 