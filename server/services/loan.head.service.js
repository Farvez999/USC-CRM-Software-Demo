const LoanHead = require("../models/loan.head.model");



exports.loanHeadAddService = async (loanHeadInfo) => {
    const loanHead = await LoanHead.create(loanHeadInfo);
    return loanHead;
}

exports.getsAllService = async (document) => {
    try {
        const courses = await LoanHead.find(document);
        return courses
    }
    catch (err) {
        // console.log(err)
        throw new Error(err.message);
    }
}

exports.getByDeleteId = async (id) => {
    try {
        const user = await LoanHead.findById(id);
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
        const lead = await LoanHead.findByIdAndDelete(id);
        return lead
    }
    catch (err) {
        // console.log(err);
        throw new Error(err.message.split(":")[2]);

    }
}