import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema(
    {
        userName: {
            type: String,
            required: true,
            unique: true,
            minlength: 3,
            maxlength: 25
        },

        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            match: /.+\@.+\..+/
        },

        password: {
            type: String,
            required: true,
            minlength: 12,
            select: false
        }
    },

    { timestamps: true }
)

userSchema.pre('save', async function () {
    if (!this.isModified('password')) return;

    this.password = await bcrypt.hash(this.password, 10)
})

userSchema.methods.comparePasswords = async function (candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password)
};

const User = mongoose.model('User', userSchema);

export default User;