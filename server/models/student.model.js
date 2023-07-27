const bcrypt = require('bcryptjs');
const { default: mongoose } = require('mongoose');
const jwt = require("jsonwebtoken");

const studentSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"]
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: [true, "Email is required"],
    },
    phone: {
        type: String,
        required: [true, "Phone is required"],
        unique: true,
    },
    password: {
        type: String,
        required: [true, "Password is required ghgh"],
    },
    role: {
        type: String,
        required: [true, "User Role is required"],
        enum: ["student"],
        default: "student",
    },
}, {
    timestamps: true,
});

studentSchema.index({ email: 1 }, { unique: true });
studentSchema.index({ phone: 1 }, { unique: true });

studentSchema.pre("save", function (next) {
    const password = this.password;
    const hashedPassword = bcrypt.hashSync(password);
    this.password = hashedPassword;
    next();
})

studentSchema.methods.matchPassword = async function (enteredPassword) {
    // console.log(enteredPassword, this.password)
    return await bcrypt.compare(enteredPassword, this.password);
}

studentSchema.methods.createJWT = async function () {
    try {
        const accessToken = jwt.sign({ id: this._id }, process.env.ACCESS_TOKEN, {
            expiresIn: "1d"
        })
        // await new Token({ token: accessToken }).save();
        return accessToken;
    }
    catch (err) {
        // console.log(err);
        throw new Error(err.message)
    }
}

const Student = mongoose.model("Student", studentSchema);

module.exports = Student;