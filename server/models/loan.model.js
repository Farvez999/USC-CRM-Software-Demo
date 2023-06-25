const { default: mongoose } = require('mongoose');

const loanSchema = mongoose.Schema({
    date: {
        type: Date,
        required: [true, "Date is required"],
    },
    loanReceipt: {
        type: String,
        required: [true, "Loan Receipt is required"],
        unique: true
    },
    // loanReceiveReceiptNo: {
    //     type: String,
    //     unique: true
    // },
    loanPurpose: {
        type: String,
        required: [true, "Purpose is required"]
    },
    loanProvide: {
        type: String,
    },
    loanReceive: {
        type: String,
    },
    discription: {
        type: String,
        required: [true, "Discription is required"],
    },
    loanAmount: {
        type: Number,
        required: [true, "Loan Amount is required"],
    },
    // loanProvideDue: {
    //     type: Number,
    //     required: [true, "Loan Provide Due is required"],
    // },
    loanProvideStatus: {
        type: String,
    },
    loanReceiveStatus: {
        type: String,
    },
}, {
    timestamps: true
})


const Loan = mongoose.model("Loan", loanSchema);

module.exports = Loan;