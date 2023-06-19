const { gets } = require('../services/payment.service');


const getPayment = async (req, res) => {
    try {
        const query = req.query;
        const users = await gets(query);
        res.status(200).json(users)
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            message: err.message
        })
    }
}

module.exports = { getPayment }