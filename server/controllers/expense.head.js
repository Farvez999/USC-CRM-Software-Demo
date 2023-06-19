const { expenseHeadAddService, getsAllService, getByDeleteId, remove } = require('../services/expense.head.service')

const addExpenseHead = async (req, res) => {
    try {
        console.log(req.user);
        if (req.user.role !== 'admin') {
            return res.status(403).send({ message: 'forbidden access' })
        }
        console.log(req.body)
        const expenseHead = await expenseHeadAddService(req.body);

        res.status(200).json({
            message: "Expense Head Added Successfully",
            expenseHead: expenseHead
        })

    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            message: err.message
        })
    }
}

const getExpenseHead = async (req, res) => {
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

module.exports = { addExpenseHead, getExpenseHead, deleteUserById }