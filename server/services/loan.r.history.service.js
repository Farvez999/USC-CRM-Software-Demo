const PayLoan = require("../models/loan.r.history.model");

exports.loanPayAddService = async (expenseInfo) => {
    const loan = await PayLoan.create(expenseInfo);
    return loan;
}

exports.getsAllService = async (document) => {
    try {
        const loans = await PayLoan.find(document).populate('loanId');
        return loans
    }
    catch (err) {
        console.log(err)
        throw new Error(err.message);
    }
}