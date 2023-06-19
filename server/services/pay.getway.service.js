const PayGetWay = require("../models/pay.getway.model");

exports.payGetwayAddService = async (leadInfo) => {
    const payGetway = await PayGetWay.create(leadInfo);
    return payGetway;
}

exports.getsAllService = async (document) => {
    try {
        const payGetways = await PayGetWay.find(document);
        return payGetways
    }
    catch (err) {
        console.log(err)
        throw new Error(err.message);
    }
}

exports.getByDeleteId = async (id) => {
    try {
        const user = await PayGetWay.findById(id);
        // console.log(user);
        return user
    }
    catch (err) {
        console.log(err)
        throw new Error(err.message);
    }
}

exports.remove = async (id) => {
    try {
        const lead = await PayGetWay.findByIdAndDelete(id);
        return lead
    }
    catch (err) {
        console.log(err);
        throw new Error(err.message.split(":")[2]);

    }
}