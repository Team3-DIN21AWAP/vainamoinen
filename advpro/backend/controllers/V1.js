import V1GA from "../models/V1GAModel.js";
import V1GM from "../models/V1GMModel.js";
import V1NM from "../models/V1NMModel.js";
import V1NA from "../models/V1NAModel.js";
import V1SM from "../models/V1SMModel.js";
import V1SA from "../models/V1SAModel.js";

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
export const getV1_NM = async(req, res) => {
    try {
        const v1_NM = await V1NM.findAll({
            attributes:['time','anomalyC']
        });
        res.json(v1_NM);
    } catch (error) {
        console.log(error);
    }
}

export const getV1_NA = async(req, res) => {
    try {
        const v1_NA = await V1NA.findAll({
            attributes:['time','anomalyC']
        });
        res.json(v1_NA);
    } catch (error) {
        console.log(error);
    }
}
export const getV1_SM = async(req, res) => {
    try {
        const v1_SM = await V1SM.findAll({
            attributes:['time','anomalyC']
        });
        res.json(v1_SM);
    } catch (error) {
        console.log(error);
    }
}
export const getV1_SA = async(req, res) => {
    try {
        const v1_SA = await V1SA.findAll({
            attributes:['time','anomalyC']
        });
        res.json(v1_SA);
    } catch (error) {
        console.log(error);
    }
}