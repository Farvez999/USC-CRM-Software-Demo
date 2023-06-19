const Head = require("../models/head.model");

exports.headAddService = async (leadInfo) => {
    const head = await Head.create(leadInfo);
    return head;
}

exports.getsAllService = async (document) => {
    try {
        const heads = await Head.find(document);
        return heads
    }
    catch (err) {
        console.log(err)
        throw new Error(err.message);
    }
}

exports.getByDeleteId = async (id) => {
    try {
        const user = await Head.findById(id);
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
        const lead = await Head.findByIdAndDelete(id);
        return lead
    }
    catch (err) {
        console.log(err);
        throw new Error(err.message.split(":")[2]);

    }
}