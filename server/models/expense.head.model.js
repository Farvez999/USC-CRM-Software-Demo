const { default: mongoose } = require('mongoose');

const expenseHeadSchema = mongoose.Schema({
    purpose: {
        type: String,
        required: [true, "Purpose is required"]
    },
}, {
    timestamps: true
})


const ExpenseHead = mongoose.model("ExpenseHead", expenseHeadSchema);

module.exports = ExpenseHead;