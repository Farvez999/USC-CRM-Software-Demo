const { default: mongoose } = require('mongoose');

const loanSchema = mongoose.Schema({
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
        required: [true, "Amount is required"],
    },
    loanDue: {
        type: Number,
        required: [true, "Amount is required"],
    },
    loanProvideDue: {
        type: Number,
        required: [true, "Amount is required"],
    },
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