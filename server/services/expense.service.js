const Expense = require("../models/expense.model");

exports.expenseAddService = async (expenseInfo) => {
    const expense = await Expense.create(expenseInfo);
    return expense;
}

exports.getsAllService = async (document) => {
    try {
        const expenses = await Expense.find(document);
        return expenses
    }
    catch (err) {
        // console.log(err)
        throw new Error(err.message);
    }
}

exports.getByDeleteId = async (id) => {
    try {
        const user = await Expense.findById(id);
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
        const lead = await Expense.findByIdAndDelete(id);
        return lead
    }
    catch (err) {
        // console.log(err);
        throw new Error(err.message.split(":")[2]);

    }
}