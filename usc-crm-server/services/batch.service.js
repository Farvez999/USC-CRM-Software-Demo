const Batch = require("../models/batch.model");

exports.batchAddService = async (leadInfo) => {
    const batch = await Batch.create(leadInfo);
    return batch;
}

exports.getsAllService = async (document) => {
    try {
        const batchs = await Batch.find(document);
        return batchs
    }
    catch (err) {
        console.log(err)
        throw new Error(err.message);
    }
}

exports.getByDeleteId = async (id) => {
    try {
        const user = await Batch.findById(id);
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
        const lead = await Batch.findByIdAndDelete(id);
        return lead
    }
    catch (err) {
        console.log(err);
        throw new Error(err.message.split(":")[2]);

    }
}