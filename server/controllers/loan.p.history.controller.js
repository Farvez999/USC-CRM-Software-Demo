const { getsAllService, loanPayAddService } = require('../services/loan.p.history.service')

const addRevLoan = async (req, res) => {
    try {
        console.log(req.user);
        if (req.user.role !== 'admin') {
            return res.status(403).send({ message: 'forbidden access' })
        }
        const loan = await loanPayAddService(req.body);

        res.status(200).json({
            message: "Loan Provide Successfully",
            loan: loan
        })

    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            message: err.message
        })
    }
}

const getRevLoan = async (req, res) => {
    try {
        const query = req.query;
        const loans = await getsAllService(query);
        res.status(200).json({
            loans
        })
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            message: err.message
        })
    }
}

module.exports = { addRevLoan, getRevLoan }