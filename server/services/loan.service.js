const Loan = require("../models/loan.model");


exports.loanAddService = async (expenseInfo) => {
    const loan = await Loan.create(expenseInfo);
    return loan;
}

exports.getsAllService = async (document) => {
    try {
        const loans = await Loan.find(document);
        return loans
    }
    catch (err) {
        // console.log(err)
        throw new Error(err.message);
    }
}

exports.getByDeleteId = async (id) => {
    try {
        const user = await Loan.findById(id);
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
        const lead = await Loan.findByIdAndDelete(id);
        return lead
    }
    catch (err) {
        // console.log(err);
        throw new Error(err.message.split(":")[2]);

    }
}

exports.update = async (id, document, options) => {
    try {
        const update = await Loan.findByIdAndUpdate(id, document, options);
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
