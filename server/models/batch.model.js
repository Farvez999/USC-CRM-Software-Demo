const { default: mongoose } = require('mongoose');

const batchSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Batch Name is required"],
        unique: true
    },
    lead: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'lead',
        }
    ]
}, {
    timestamps: true
})


const Batch = mongoose.model("Batch", batchSchema);

module.exports = Batch;