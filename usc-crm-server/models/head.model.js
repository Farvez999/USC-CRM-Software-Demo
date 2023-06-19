const { default: mongoose } = require('mongoose');

const headSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Head is required"],
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


const Head = mongoose.model("Head", headSchema);

module.exports = Head;