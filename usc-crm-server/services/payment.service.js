const Payment = require("../models/payment.model");

exports.gets = async (document) => {
    try {
        const payment = await Payment.find(document);
        return payment
    }
    catch (err) {
        console.log(err)
        throw new Error(err.message);
    }
}

