import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter your name"],
      trim: true,
      maxLength: 50,
    },

    email: {
      type: String,
      required: [true, "Please enter your email"],
      unique: true,
      lowercase: true,
    },

    password: {
      type: String,
      required: [true, "Please enter your password"],
      minlength: 6,
    },

    role: {
      type: String,
      enum: ["admin", "librarian", "student"],
      default: "student",
    },

    avatar: {
      public_id: String,
      url: String,
    },

    isActive: {
      type: Boolean,
      default: true,
    },
    accountVerified: {
      type: Boolean,
      default: false,
    },
    verificationCode:Number,
    verificationCodeExpire:Date,
    borrowedBooks: [
      {
        bookId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Borrow",
        },

        returned: {
          type: Boolean,
          default: false,
        },

        bookTitle: String,

        borrowedDate: {
          type: Date,
          default: Date.now,
        },

        dueDate: Date,

        returnedDate: {
          type: Date,
        },

        fineAmount: {
          type: Number,
          default: 0,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

// 🔐 Password Hashing
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
});

//
// 🔑 JWT Token
userSchema.methods.getJWTToken = function () {
  return jwt.sign({ id: this._id, role: this.role }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

// 🔐 Compare Password
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

export default mongoose.model("User", userSchema);
