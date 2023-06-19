const { default: mongoose } = require('mongoose');

const paymentSchema = mongoose.Schema({
    admissionFee: {
        type: Number,
        required: true
    },
    fristInstallment: {
        type: Number,
        required: true
    },
    secondInstallment: {
        type: Number,
        required: true
    },
    thirdInstallment: {
        type: Number,
        required: true
    },
    nextInstallmentDate: {
        type: String,
        required: true
    },
    paymentAccounts: {
        type: String,
        required: true
    },
    transactionId: {
        type: String,
        required: true
    }
}, {
    timestamps: true
})


const Payment = mongoose.model("Payment", paymentSchema);

module.exports = Payment;