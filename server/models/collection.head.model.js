const { default: mongoose } = require('mongoose');

const collectionHeadSchema = mongoose.Schema({
    purpose: {
        type: String,
        required: [true, "Purpose is required"]
    },
}, {
    timestamps: true
})


const CollectionHead = mongoose.model("CollectionHead", collectionHeadSchema);

module.exports = CollectionHead;