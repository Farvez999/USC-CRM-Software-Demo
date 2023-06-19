const Collection = require("../models/collection.model");

exports.collectionAddService = async (expenseInfo) => {
    const collection = await Collection.create(expenseInfo);
    return collection;
}

exports.getsAllService = async (document) => {
    try {
        const collections = await Collection.find(document);
        return collections
    }
    catch (err) {
        console.log(err)
        throw new Error(err.message);
    }
}

exports.getByDeleteId = async (id) => {
    try {
        const user = await Collection.findById(id);
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
        const lead = await Collection.findByIdAndDelete(id);
        return lead
    }
    catch (err) {
        console.log(err);
        throw new Error(err.message.split(":")[2]);

    }
}