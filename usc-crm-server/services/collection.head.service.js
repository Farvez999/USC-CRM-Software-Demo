const CollectionHead = require("../models/collection.head.model");


exports.collectionHeadAddService = async (collectionHeadInfo) => {
    const collectionHead = await CollectionHead.create(collectionHeadInfo);
    return collectionHead;
}

exports.getsAllService = async (document) => {
    try {
        const courses = await CollectionHead.find(document);
        return courses
    }
    catch (err) {
        console.log(err)
        throw new Error(err.message);
    }
}

exports.getByDeleteId = async (id) => {
    try {
        const user = await CollectionHead.findById(id);
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
        const lead = await CollectionHead.findByIdAndDelete(id);
        return lead
    }
    catch (err) {
        console.log(err);
        throw new Error(err.message.split(":")[2]);

    }
}