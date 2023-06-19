const { expenseAddService, getsAllService, getByDeleteId, remove } = require('../services/expense.service')

const addExpense = async (req, res) => {
    try {
        console.log(req.user);
        if (req.user.role !== 'admin') {
            return res.status(403).send({ message: 'forbidden access' })
        }
        const expense = await expenseAddService(req.body);

        res.status(200).json({
            message: "Expense Added Successfully",
            expense: expense
        })

    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            message: err.message
        })
    }
}

const getExpense = async (req, res) => {
    try {
        const query = req.query;
        const expenses = await getsAllService(query);
        res.status(200).json({
            expenses
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

module.exports = { addExpense, getExpense, deleteUserById }