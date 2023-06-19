const { default: mongoose } = require('mongoose');

const courseSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Course Name is required"],
        unique: true
    },
}, {
    timestamps: true
})


const Course = mongoose.model("Course", courseSchema);

module.exports = Course;