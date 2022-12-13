import V6 from "../models/V6Model.js";



export const getV6 = async(req, res) => {
    try {
        const v6 = await V6.findAll({
            attributes:['ageofgasBP','CO2ppm']
        });
        res.json(v6);
    } catch (error) {
        console.log(error);
    }
}
