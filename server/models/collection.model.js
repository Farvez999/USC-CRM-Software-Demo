const { default: mongoose } = require('mongoose');

const collectionSchema = mongoose.Schema({
    purpose: {
        type: String,
        required: [true, "Purpose is required"]
    },
    discription: {
        type: String,
        required: [true, "Discription is required"],
    },
    moneyReceipt: {
        type: String,
        required: [true, "Money Receipt No is required"],
        unique: true
    },
    amount: {
        type: Number,
        required: [true, "Amount is required"],
    },
    receiveBy: {
        type: String,
        required: [true, "Receive By is required"],
    },
    receiveFrom: {
        type: String,
        required: [true, "Receive From is required"],
    },
}, {
    timestamps: true
})


const Collection = mongoose.model("Collection", collectionSchema);

module.exports = Collection;