import V1A from "../models/V1AModel.js";

export const getV1_A = async(req, res) => {
    try {
        const v1_annual = await V1A.findAll({
            attributes:['time','anomalyC']
        });
        res.json(v1_annual);
    } catch (error) {
        console.log(error);
    }
}
 