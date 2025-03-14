import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide a name'],
    },
    email: {
      type: String,
      required: [true, 'Please provide an email'],
      unique: true,
      match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email'],
    },
    password: {
      type: String,
      required: [true, 'Please provide a password'],
      minlength: 8,
      select: false,
    },
    phoneNumber: {
      type: String,
    },
    school: {
      type: String,
      required: [true, 'Please provide your school name'],
    },
    age: {
      type: Number,
      required: [true, 'Please provide your age'],
      min: 13,
      max: 19,
    },
    parentName: {
      type: String,
      required: [true, 'Please provide parent/guardian name'],
    },
    parentPhone: {
      type: String,
      required: [true, 'Please provide parent/guardian phone'],
    },
    parentEmail: {
      type: String,
      required: [true, 'Please provide parent/guardian email'],
      match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email'],
    },
    dietaryRestrictions: {
      type: String,
    },
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
  },
  { timestamps: true }
);

// Encrypt password before saving
UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Method to compare password
UserSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

export default mongoose.models.User || mongoose.model('User', UserSchema);
