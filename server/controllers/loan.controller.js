const { loanAddService, getsAllService, getByDeleteId, remove, update } = require('../services/loan.service')

const addLoan = async (req, res) => {
    try {
        console.log(req.user);
        if (req.user.role !== 'admin') {
            return res.status(403).send({ message: 'forbidden access' })
        }
        const loan = await loanAddService(req.body);

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

const getLoan = async (req, res) => {
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
            message: "User delete successful",
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


const updateLoanPayById = async (req, res) => {
    try {
        const id = req.params.id;

        const document = {

            loanDue: req.body.loanDue,

        };
        const options = { new: true };

        const lead = await update(id, document, options);
        // const newLead = lead._id !== id
        res.status(200).json({
            message: "Lead update successful",
            // newLead,
            lead
        })
        // console.log(lead)
        // console.log(newLead)
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            message: err.message
        })
    }
}

const updateLoanProPayById = async (req, res) => {
    try {
        const id = req.params.id;

        const document = {

            loanProvideDue: req.body.loanProvideDue,

        };
        const options = { new: true };

        const lead = await update(id, document, options);
        // const newLead = lead._id !== id
        res.status(200).json({
            message: "Lead update successful",
            // newLead,
            lead
        })
        // console.log(lead)
        // console.log(newLead)
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            message: err.message
        })
    }
}


module.exports = { addLoan, getLoan, deleteUserById, updateLoanPayById, updateLoanProPayById }