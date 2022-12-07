import V5 from "../models/V5Model.js";


export const getV5 = async(req, res) => {
    try {
        const v5 = await V5.findAll({
            attributes:['ageofair','CO2concentration']
        });
        res.json(v5);
    } catch (error) {
        console.log(error);
    }
}
