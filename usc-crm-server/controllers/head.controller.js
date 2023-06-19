const { headAddService, getsAllService, getByDeleteId, remove } = require('../services/head.service')

const addHead = async (req, res) => {
    try {
        // console.log(req.user);
        if (req.user.role !== 'admin') {
            return res.status(403).send({ message: 'forbidden access' })
        }
        const lead = await headAddService(req.body);
        res.status(200).json({
            message: "New Head Added Successfully",
            lead: lead
        })

    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            message: err.message
        })
    }
}

const getHead = async (req, res) => {
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
        // console.log(id);

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

module.exports = { addHead, getHead, deleteUserById }