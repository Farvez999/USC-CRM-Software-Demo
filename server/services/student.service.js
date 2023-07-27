const Student = require("../models/student.model");

exports.signupService = async (userInfo) => {
    const student = await Student.create(userInfo);
    return student;
}

exports.findOne = async (query) => {
    try {
        const student = await Student.findOne(query);
        return student;
    }
    catch (err) {
        // console.log(err.message);
        throw new Error(err.message.split(":")[2]);
    }
}

exports.gets = async () => {
    try {
        const students = await Student.find({});
        return students
    }
    catch (err) {
        // console.log(err)
        throw new Error(err.message);
    }
}

exports.getById = async (id) => {
    try {
        const student = await Student.findById(id);
        return student
    }
    catch (err) {
        // console.log(err)
        throw new Error(err.message);
    }
}

exports.update = async (id, document, options) => {
    // // console.log("Document", document)
    // // console.log("id", id)
    try {
        const update = await Student.findByIdAndUpdate(id, { password: document }, options);
        return update
    }
    catch (err) {
        // console.log(err);
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

// const remove = async (id) => {
//     try {
//         const user = await User.findByIdAndDelete(id);
//         return user
//     }
//     catch (err) {
//         // console.log(err);
//         throw new Error(err.message.split(":")[2]);

//     }
// }

exports.getByDeleteId = async (id) => {
    try {
        const user = await Student.findById(id);
        // // console.log(user);
        return user
    }
    catch (err) {
        // console.log(err)
        throw new Error(err.message);
    }
}

exports.remove = async (id) => {
    try {
        const lead = await Student.findByIdAndDelete(id);
        return lead
    }
    catch (err) {
        // console.log(err);
        throw new Error(err.message.split(":")[2]);

    }
}

// module.exports = {
//     create,
//     gets,
//     getById,
//     update,
//     remove
// };