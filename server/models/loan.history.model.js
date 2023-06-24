const { default: mongoose, Schema } = require('mongoose');

const payLoanSchema = mongoose.Schema({
    payAmmount: {
        type: String,
        required: [true, "Pay Ammount is required"],
    },
    loanReceipt: {
        type: String,
        required: [true, "Loan Receipt is required"],
        unique: true
    },
    discription: {
        type: String,
        required: [true, "Discription is required"],
    },
    loanId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Loan',
    },
}, {
    timestamps: true
})


const PayLoan = mongoose.model("PayLoan", payLoanSchema);

module.exports = PayLoan;