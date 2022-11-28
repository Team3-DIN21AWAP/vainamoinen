
export const getV5 = async(req, res) => {
    try {
        const v5 = await V5.findAll({
            attributes:['ageofair','CO2']
        });
        res.json(v5);
    } catch (error) {
        console.log(error);
    } 
}