const Lead = require("../models/lead.model");


exports.leadAddService = async (leadInfo) => {
    console.log(leadInfo);
    const lead = await Lead.create(leadInfo);
    return lead;
}

exports.gets = async (document) => {
    try {
        const leads = await Lead.find(document);
        return leads
    }
    catch (err) {
        console.log(err)
        throw new Error(err.message);
    }
}

exports.getById = async (id) => {
    try {
        const user = await Lead.find({ 'user.id': { $in: id } });
        // console.log(user);
        return user
    }
    catch (err) {
        console.log(err)
        throw new Error(err.message);
    }
}

exports.update = async (id, document, options) => {
    try {
        const update = await Lead.findByIdAndUpdate(id, document, options);
        return update
    }
    catch (err) {
        console.log(err);
        if (err.code === 11000) {
            if (err.keyValue?.name) {
                throw new Error("Name already exist");
            }
            if (err.keyValue?.email) {
                throw new Error("Email already exist");
            }
        }
        else {
            throw new Error(err.message.split(":")[2]);
        }
    }
}

exports.getByDeleteId = async (id) => {
    try {
        const user = await Lead.findById(id);
        // console.log(user);
        return user
    }
    catch (err) {
        console.log(err)
        throw new Error(err.message);
    }
}

exports.getsLead = async (document) => {
    try {
        const leads = await Lead.find(document);
        console.log(leads);
        return leads
    }
    catch (err) {
        console.log(err)
        throw new Error(err.message);
    }
}

exports.remove = async (id) => {
    try {
        const lead = await Lead.findByIdAndDelete(id);
        return lead
    }
    catch (err) {
        console.log(err);
        throw new Error(err.message.split(":")[2]);

    }
}