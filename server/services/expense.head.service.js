const ExpenseHead = require("../models/expense.head.model");

exports.expenseHeadAddService = async (expenseHeadInfo) => {
    const expenseHead = await ExpenseHead.create(expenseHeadInfo);
    return expenseHead;
}

exports.getsAllService = async (document) => {
    try {
        const courses = await ExpenseHead.find(document);
        return courses
    }
    catch (err) {
        // console.log(err)
        throw new Error(err.message);
    }
}

exports.getByDeleteId = async (id) => {
    try {
        const user = await ExpenseHead.findById(id);
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
        const lead = await ExpenseHead.findByIdAndDelete(id);
        return lead
    }
    catch (err) {
        // console.log(err);
        throw new Error(err.message.split(":")[2]);

    }
}