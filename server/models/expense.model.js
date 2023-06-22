const { default: mongoose } = require('mongoose');

const expenseSchema = mongoose.Schema({
    date: {
        type: Date,
        required: [true, "Date is required"]
    },
    purpose: {
        type: String,
        required: [true, "Purpose is required"]
    },
    expenseBy: {
        type: String,
        required: [true, "ExpenseBy is required"]
    },
    discription: {
        type: String,
        required: [true, "Discription is required"],
    },
    voucherNo: {
        type: Number,
        required: [true, "Voucher No is required"],
        unique: true
    },
    amount: {
        type: Number,
        required: [true, "Amount is required"],
    },
}, {
    timestamps: true
})


const Expense = mongoose.model("Expense", expenseSchema);

module.exports = Expense;