const { default: mongoose } = require('mongoose');

const leadSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Lead Name is required"],
    },
    phone: {
        type: String,
        required: [true, "Lead Phone Number is required"],
        unique: true
    },
    email: {
        type: String,
        // required: [true, "Lead Email is required"],
        // unique: truew
    },
    firstFollow: {
        type: String
    },
    secondFollow: {
        type: String
    },
    thirdtFollow: {
        type: String
    },
    nextFollow: {
        type: String
    },
    remark: {
        type: String
    },
    remarkTwo: {
        type: String
    },
    admissionStatus: {
        type: String
    },
    head: {
        name: {
            type: String,
            required: true
        },
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Head',
            // required: true
        }
    },
    user: {
        name: {
            type: String,
            required: true
        },
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            // required: true
        }
    },
    course: {
        name: {
            type: String,
            required: true
        },
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Course',
            // required: true
        }

    },
    batch: {
        name: {
            type: String,
            required: true
        },
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Batch',
            required: true
        }
    },
    preBatch: {
        name: {
            type: String,
            // required: true
        },
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Batch',
            // required: true
        }
    },
    admission: {
        type: Boolean
    },
    close: {
        type: Boolean
    },
    onlineInterested: {
        type: Boolean
    },
    offlineInterested: {
        type: Boolean
    },
    seminarInterested: {
        type: Boolean
    },
    noReceive: {
        type: Boolean
    },
    seminarAttend: {
        type: Boolean
    },
    closePayment: {
        type: Boolean
    },

    admissionFee: {
        type: Number,
        // required: true
    },

    fristInstallment: {
        type: Number,
        // required: true
    },
    fristPaymentAccounts: {
        type: String,
        // required: true
    },
    fristInstallmentTID: {
        type: String,
        // required: true
    },
    fristInstallmentDate: {
        type: String,
        // required: true
    },

    secondInstallment: {
        type: Number,
        // required: true
    },
    secondPaymentAccounts: {
        type: String,
        // required: true
    },
    secondInstallmentTID: {
        type: String,
        // required: true
    },
    secondInstallmentDate: {
        type: String,
        // required: true
    },

    thirdInstallment: {
        type: Number,
        // required: true
    },
    thirdPaymentAccounts: {
        type: String,
        // required: true
    },
    thirdInstallmentTID: {
        type: String,
        // required: true
    },
    thirdInstallmentDate: {
        type: String,
        // required: true
    },

    nextInstallmentDate: {
        type: String,
        // required: true
    },

    totalInstallment: {
        type: Number,
        // required: true
    }
}, {
    timestamps: true
})


const Lead = mongoose.model("Lead", leadSchema);

module.exports = Lead;