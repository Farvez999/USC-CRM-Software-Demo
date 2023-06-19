const { default: mongoose } = require('mongoose');

const loanHeadSchema = mongoose.Schema({
    purpose: {
        type: String,
        required: [true, "Purpose is required"]
    },
}, {
    timestamps: true
})


const LoanHead = mongoose.model("LoanHead", loanHeadSchema);

module.exports = LoanHead;