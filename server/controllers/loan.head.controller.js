const { loanHeadAddService, getsAllService, getByDeleteId, remove } = require('../services/loan.head.service')

const addLoanHead = async (req, res) => {
    try {
        console.log(req.user);
        if (req.user.role !== 'admin') {
            return res.status(403).send({ message: 'forbidden access' })
        }
        console.log(req.body)
        const loanHead = await loanHeadAddService(req.body);

        res.status(200).json({
            message: "Loan Head Added Successfully",
            loanHead: loanHead
        })

    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            message: err.message
        })
    }
}

const getLoanHead = async (req, res) => {
    try {
        const query = req.query;
        const users = await getsAllService(query);
        res.status(200).json({
            users
        })
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            message: err.message
        })
    }
}

const deleteUserById = async (req, res) => {
    try {
        const id = req.params.id;

        const exist = await getByDeleteId(id);
        if (!exist) {
            return res.status(404).json({
                message: "No user found!",
            })
        }

        const lead = await remove(id);
        res.status(200).json({
            message: "Loan delete successful",
            lead
        })
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            message: err.message
        })
    }
}

module.exports = { addLoanHead, getLoanHead, deleteUserById }