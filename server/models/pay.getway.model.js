const { default: mongoose } = require('mongoose');

const payGetWaySchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Pay GetWay Name is required"],
        unique: true
    }
}, {
    timestamps: true
})


const PayGetWay = mongoose.model("PayGetWay", payGetWaySchema);

module.exports = PayGetWay;