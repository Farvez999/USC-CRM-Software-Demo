const Course = require('../models/course.model');
const User = require('../models/user.model');
const Batch = require('../models/batch.model');
const Head = require('../models/head.model');
const { leadAddService, gets, getById, update, getByTodayLeads, getsLead, getByDeleteId, remove } = require('../services/lead.service');
const Lead = require('../models/lead.model');

const addLeads = async (req, res) => {
    try {

        if (req.user.role !== 'admin') {
            return res.status(403).send({ message: 'forbidden access' })
        }
        const { leads, courseName, batchName, employeeName, headName } = req.body;

        const courseDetails = await Course.findById(courseName);
        const batchDetails = await Batch.findById(batchName);
        const employeeDetails = await User.findById(employeeName);
        // const headDetails = await Head.findById(headName);
        const headDetails = await User.findById(headName);

        // console.log(leads)
        const newLeadsArray = leads.map(lead => {
            return {
                name: lead.Name,
                phone: lead.Phone,
                email: lead?.Email,
                firstFollow: lead.FirstFollowup,
                secondFollow: lead.SecondFollowup,
                thirdtFollow: lead.ThirdFollowup,
                nextFollow: lead.NextFollow,
                remark: lead.Remark,
                remarkTwo: lead.RemarkTwo,
                admissionStatus: lead.AdmissionStatus,

                // admissionFee: 0,

                // fristInstallment: 0,
                // fristPaymentAccounts: "",
                // fristInstallmentTID: "",
                // fristInstallmentDate: "",

                // secondInstallment: 0,
                // secondPaymentAccounts: "",
                // secondInstallmentTID: "",
                // secondInstallmentDate: "",

                // thirdInstallment: 0,
                // thirdPaymentAccounts: "",
                // thirdInstallmentTID: "",
                // thirdInstallmentDate: "",

                // nextInstallmentDate: "",

                // totalInstallment: 0,

                head: {
                    name: headDetails.name,
                    id: headDetails._id,
                },
                user: {
                    name: employeeDetails.name,
                    id: employeeDetails._id,
                },
                course: {
                    name: courseDetails.name,
                    id: courseDetails._id,
                },
                batch: {
                    name: batchDetails.name,
                    id: batchDetails._id,
                }
            }
        })

        let success = 0;
        let error = 0;


        await newLeadsArray.map(async (lead, index) => {
            try {
                // console.log(lead)
                const saveLead = await Lead.create(lead);
                // console.log("saveLead", saveLead)
                if (saveLead._id) {
                    success += 1;
                }
            }
            catch (err) {
                // console.error(err);
                error += 1;
                // console.log(err);
            }

            if (index === newLeadsArray.length - 1) {
                res.status(200).json({
                    message: success ? `New Lead ${success} Added Successfully` : `There were ${error} new Lead Faild`,
                    //lead: lead
                    success,
                    error

                })
            }
        })

    }
    catch (err) {
        // // console.log(err);
        res.status(500).json({
            message: err.message
        })
    }
}

const addOnlineLeads = async (req, res) => {
    try {

        if (req.user.role !== 'admin') {
            return res.status(403).send({ message: 'forbidden access' })
        }
        const { leads, courseName, batchName, employeeName, headName } = req.body;

        const courseDetails = await Course.findById(courseName);
        const batchDetails = await Batch.findById(batchName);
        const employeeDetails = await User.findById(employeeName);
        // const headDetails = await Head.findById(headName);
        const headDetails = await User.findById(headName);

        // console.log(leads)
        const newLeadsArray = leads.map(lead => {
            return {
                name: lead.Name,
                phone: lead.Phone,
                email: lead.Email,
                firstFollow: lead.FirstFollowup,
                secondFollow: lead.SecondFollowup,
                thirdtFollow: lead.ThirdFollowup,
                nextFollow: lead.NextFollow,
                remark: lead.Remark,
                remarkTwo: lead.RemarkTwo,
                admissionStatus: lead.AdmissionStatus,

                head: {
                    name: headDetails.name,
                    id: headDetails._id,
                },
                user: {
                    name: employeeDetails.name,
                    id: employeeDetails._id,
                },
                course: {
                    name: courseDetails.name,
                    id: courseDetails._id,
                },
                batch: {
                    name: batchDetails.name,
                    id: batchDetails._id,
                },
                onlineInterested: true
            }
        })

        let success = 0;
        let error = 0;


        await newLeadsArray.map(async (lead, index) => {
            try {
                // console.log(lead)
                const saveLead = await Lead.create(lead);
                // console.log("saveLead", saveLead)
                if (saveLead._id) {
                    success += 1;
                }
            }
            catch (err) {
                // console.error(err);
                error += 1;
                // console.log(err);
            }

            if (index === newLeadsArray.length - 1) {
                res.status(200).json({
                    message: success ? `New Lead ${success} Added Successfully` : `There were ${error} new Lead Faild`,
                    //lead: lead
                    success,
                    error

                })
            }
        })

    }
    catch (err) {
        // // console.log(err);
        res.status(500).json({
            message: err.message
        })
    }
}

const addOfflineLeads = async (req, res) => {
    try {

        if (req.user.role !== 'admin') {
            return res.status(403).send({ message: 'forbidden access' })
        }
        const { leads, courseName, batchName, employeeName, headName } = req.body;

        const courseDetails = await Course.findById(courseName);
        const batchDetails = await Batch.findById(batchName);
        const employeeDetails = await User.findById(employeeName);
        const headDetails = await User.findById(headName);

        // console.log(leads)
        const newLeadsArray = leads.map(lead => {
            return {
                name: lead.Name,
                phone: lead.Phone,
                email: lead.Email,
                firstFollow: lead.FirstFollowup,
                secondFollow: lead.SecondFollowup,
                thirdtFollow: lead.ThirdFollowup,
                nextFollow: lead.NextFollow,
                remark: lead.Remark,
                remarkTwo: lead.RemarkTwo,
                admissionStatus: lead.AdmissionStatus,

                head: {
                    name: headDetails.name,
                    id: headDetails._id,
                },
                user: {
                    name: employeeDetails.name,
                    id: employeeDetails._id,
                },
                course: {
                    name: courseDetails.name,
                    id: courseDetails._id,
                },
                batch: {
                    name: batchDetails.name,
                    id: batchDetails._id,
                },
                offlineInterested: true
            }
        })

        let success = 0;
        let error = 0;


        await newLeadsArray.map(async (lead, index) => {
            try {
                // console.log(lead)
                const saveLead = await Lead.create(lead);
                // console.log("saveLead", saveLead)
                if (saveLead._id) {
                    success += 1;
                }
            }
            catch (err) {
                // console.error(err);
                error += 1;
                // console.log(err);
            }

            if (index === newLeadsArray.length - 1) {
                res.status(200).json({
                    message: success ? `New Lead ${success} Added Successfully` : `There were ${error} new Lead Faild`,
                    //lead: lead
                    success,
                    error

                })
            }
        })

    }
    catch (err) {
        // // console.log(err);
        res.status(500).json({
            message: err.message
        })
    }
}

const addAdmissions = async (req, res) => {
    try {

        if (req.user.role !== 'admin') {
            return res.status(403).send({ message: 'forbidden access' })
        }

        const { name, email, phone, admission, admissionFee, admissionStatus, fristInstallment, fristPaymentAccounts, fristInstallmentTID, fristInstallmentDate, secondInstallment, secondPaymentAccounts, secondInstallmentTID, secondInstallmentDate, thirdInstallment, thirdPaymentAccounts, thirdInstallmentTID, thirdInstallmentDate, nextInstallmentDate, totalInstallment, courseName, batchName, employeeName, headName } = req.body;

        const courseDetails = await Course.findById(courseName);
        const batchDetails = await Batch.findById(batchName);
        const employeeDetails = await User.findById(employeeName);
        // const headDetails = await Head.findById(headName);
        const headDetails = await User.findById(headName);

        const lead = {
            name,
            phone,
            email,
            admission,
            admissionFee,
            admissionStatus,

            fristInstallment,
            fristPaymentAccounts,
            fristInstallmentTID,
            fristInstallmentDate,

            secondInstallment,
            secondPaymentAccounts,
            secondInstallmentTID,
            secondInstallmentDate,

            thirdInstallment,
            thirdPaymentAccounts,
            thirdInstallmentTID,
            thirdInstallmentDate,

            nextInstallmentDate,

            // paymentAccounts,
            // transactionId,
            totalInstallment,
            head: {
                name: headDetails.name,
                id: headDetails._id,
            },
            user: {
                name: employeeDetails.name,
                id: employeeDetails._id,
            },
            course: {
                name: courseDetails.name,
                id: courseDetails._id,
            },
            batch: {
                name: batchDetails.name,
                id: batchDetails._id,
            }
        }
        // // console.log(lead)

        const saveLead = await Lead.create(lead);
        // res.status(200).json(saveLead)
        res.status(200).json({
            message: "New Lead Added Successfully",
            saveLead
            // success, error
        })



    }
    catch (err) {
        // // console.log(err);
        res.status(500).json({
            message: err.message
        })
    }
}

const getLeads = async (req, res) => {
    try {
        const query = req.query;
        const users = await gets(query);
        res.status(200).json(users)
    }
    catch (err) {
        // console.log(err);
        res.status(500).json({
            message: err.message
        })
    }
}

const getUserById = async (req, res) => {
    try {
        const id = req.params.id;
        // // console.log(id);
        const users = await getById(id);
        res.status(200).json(users)
    }
    catch (err) {
        // console.log(err);
        res.status(500).json({
            message: err.message
        })
    }
}

const updateLeadById = async (req, res) => {
    try {
        const id = req.params.id;


        const options = { new: true };

        const lead = await update(id, req.body, options);
        // const newLead = lead._id !== id
        res.status(200).json({
            message: "Lead update successful",
            // newLead,
            lead
        })
        // // console.log(lead)
        // // console.log(newLead)
    }
    catch (err) {
        // console.log(err);
        res.status(500).json({
            message: err.message
        })
    }
}

const updateAddPayById = async (req, res) => {
    try {
        const id = req.params.id;

        const document = {
            // firstFollow: req.body.firstFollow,
            // secondFollow: req.body.secondFollow,
            // thirdtFollow: req.body.thirdtFollow,
            // nextFollow: req.body.nextFollow,
            // remark: req.body.remark,
            // remarkTwo: req.body.remarkTwo,

            admissionFee: req.body.admissionFee,
            admissionStatus: req.body.admissionStatus,

            // batch: {
            //     // name: batchDetails.name,
            //     name: req.body.batch,
            //     // id: batchDetails._id,
            // },
            batch: {
                name: req.body.batch,
                id: req.body.batchId
            },

            fristInstallment: req.body.fristInstallment,
            fristInstallmentDate: req.body.fristInstallmentDate,
            fristInstallmentTID: req.body.fristInstallmentTID,
            fristPaymentAccounts: req.body.fristPaymentAccounts,

            nextInstallmentDate: req.body.nextInstallmentDate,
            preBatch: req.body.preBatch,

            secondInstallment: req.body.secondInstallment,
            secondInstallmentDate: req.body.secondInstallmentDate,
            secondInstallmentTID: req.body.secondInstallmentTID,
            secondPaymentAccounts: req.body.secondPaymentAccounts,

            thirdInstallment: req.body.thirdInstallment,
            thirdInstallmentDate: req.body.thirdInstallmentDate,
            thirdInstallmentTID: req.body.thirdInstallmentTID,
            thirdPaymentAccounts: req.body.thirdPaymentAccounts,

            totalInstallment: req.body.totalInstallment
        };
        // // console.log(document)
        const options = { new: true };

        const lead = await update(id, document, options);
        // const newLead = lead._id !== id
        res.status(200).json({
            message: "Lead update successful",
            // newLead,
            lead
        })
        // // console.log(lead)
        // // console.log(newLead)
    }
    catch (err) {
        // console.log(err);
        res.status(500).json({
            message: err.message
        })
    }
}

// function formatedDate(date) {
//     const newDate = new Date(date);
//     return `${newDate.getFullYear()}-${newDate.getMonth() + 1}-${newDate.getDate()}`
// }
function formatedDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;

    return [year, month, day].join('-');
}


const getTodayLeads = async (req, res) => {
    try {
        const date = formatedDate(req.params.date);
        // console.log(date);

        const users = await getsLead({ $or: [{ firstFollow: date }, { secondFollow: date }, { thirdtFollow: date }, { nextFollow: date }] });
        // console.log(users);
        res.status(200).json(users)
    }
    catch (err) {
        // console.log(err);
        res.status(500).json({
            message: err.message
        })
    }
}
const deleteUserById = async (req, res) => {
    try {
        const id = req.params.id;
        // // console.log(id);

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
        // console.log(err);
        res.status(500).json({
            message: err.message
        })
    }
}

module.exports = { addLeads, addOnlineLeads, addOfflineLeads, addAdmissions, getLeads, getUserById, updateLeadById, updateAddPayById, getTodayLeads, deleteUserById }