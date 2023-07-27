const ReceiveLoan = require("../models/loan.p.history.model");


exports.loanPayAddService = async (expenseInfo) => {
    const loan = await ReceiveLoan.create(expenseInfo);
    return loan;
}

exports.getsAllService = async (document) => {
    try {
        const loans = await ReceiveLoan.find(document).populate('loanId');
        return loans
    }
    catch (err) {
        // console.log(err)
        throw new Error(err.message);
    }
}