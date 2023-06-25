const { default: mongoose, Schema } = require('mongoose');

const receiveLoanSchema = mongoose.Schema({
    revAmmount: {
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


const ReceiveLoan = mongoose.model("ReceiveLoan", receiveLoanSchema);

module.exports = ReceiveLoan;