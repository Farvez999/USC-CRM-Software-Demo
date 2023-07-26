const bcrypt = require('bcryptjs');
const { default: mongoose } = require('mongoose');
const jwt = require("jsonwebtoken");

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
        unique: true
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        unique: true
    },
    role: {
        type: String,
        required: [true, "User Role is required"],
        enum: ["user", "head", "accounts", "admin"],
        default: "user",
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

userSchema.pre("save", function (next) {
    const password = this.password;
    const hashedPassword = bcrypt.hashSync(password);
    this.password = hashedPassword;
    next();
})

userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
}

userSchema.methods.createJWT = async function () {
    try {
        const accessToken = jwt.sign({ id: this._id }, process.env.ACCESS_TOKEN, {
            expiresIn: "1d"
        })
        // await new Token({ token: accessToken }).save();
        return accessToken;
    }
    catch (err) {
        console.log(err);
        throw new Error(err.message)
    }
}

const User = mongoose.model("User", userSchema);

module.exports = User;