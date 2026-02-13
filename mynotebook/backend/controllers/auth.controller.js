const UserModel = require("../schema/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const SECRET_KEY = process.env.SECRET_KEY;


const signupFunc = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "All fields are required!",
            });
        }

        if (password.length < 8) {
            return res.status(400).json({
                success: false,
                message: "Password must be at least 8 characters long!",
            });
        }

        const existingUser = await UserModel.findOne({ email });
        if (existingUser) {
            return res.status(409).json({
                success: false,
                message: "Email already registered!",
            });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = await UserModel.create({
            name,
            email,
            password: hashedPassword,
        });

        const token = jwt.sign({ id: user._id }, SECRET_KEY, {
            expiresIn: "7d",
        });

        const userData = user.toObject();
        delete userData.password;

        return res.status(201).json({
            success: true,
            message: "Account created successfully!",
            token,
            user: userData,
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error!",
        });
    }
};


const loginFunc = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Email and password are required!",
            });
        }

        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password!",
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password!",
            });
        }

        const token = jwt.sign({ id: user._id }, SECRET_KEY, {
            expiresIn: "7d",
        });

        const userData = user.toObject();
        delete userData.password;

        return res.status(200).json({
            success: true,
            message: "Login successful!",
            token,
            user: userData,
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error!",
        });
    }
};


const profileFunc = async (req, res) => {
    try {
        const user = await UserModel.findById(req.user).select("-password");

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found!",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Profile fetched successfully!",
            user,
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error!",
        });
    }
};


const updateFunc = async (req, res) => {
    try {
        const user = await UserModel.findById(req.user);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found!",
            });
        }

        const fields = [
            "name", "phone", "age", "gender",
            "address", "city", "state",
            "country", "pincode", "avatar"
        ];

        fields.forEach(field => {
            if (req.body[field] !== undefined) {
                user[field] = req.body[field];
            }
        });

        await user.save();

        const userData = user.toObject();
        delete userData.password;

        return res.status(200).json({
            success: true,
            message: "Profile updated successfully!",
            user: userData,
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error!",
        });
    }
};


const deleteFunc = async (req, res) => {
    try {
        const user = await UserModel.findById(req.user);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found!",
            });
        }

        await UserModel.findByIdAndDelete(req.user);

        return res.status(200).json({
            success: true,
            message: "Account deleted successfully!",
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error!",
        });
    }
};

module.exports = {
    signupFunc,
    loginFunc,
    profileFunc,
    updateFunc,
    deleteFunc,
};
