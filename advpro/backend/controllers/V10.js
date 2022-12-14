import V10 from "../models/V10Model.js";

export const getV10 = async(req, res) => {
    try {
        const v10 = await V10.findAll({
            attributes:['year','event']
        });
        res.json(v10);
    } catch (error) {
        console.log(error);
    }
}
