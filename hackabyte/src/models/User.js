import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

// Helper function to calculate age from date of birth
const calculateAge = (dateOfBirth) => {
  if (!dateOfBirth) return null;
  
  const today = new Date();
  const birthDate = new Date(dateOfBirth);
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  
  // If birthday hasn't occurred yet this year, subtract one year
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  
  return age;
};

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
      required: [true, 'Please provide your school name (or N/A if not applicable)'],
      validate: {
        validator: function(value) {
          // Allow actual school names or "N/A"
          return value && (value.trim() !== '' || value.toUpperCase() === 'N/A');
        },
        message: 'School name is required (or N/A if not applicable)'
      }
    },
    dateOfBirth: {
      type: Date,
      required: [true, 'Please provide your date of birth'],
      validate: {
        validator: function(value) {
          // Ensure date is in the past
          return value < new Date();
        },
        message: 'Date of birth must be in the past'
      }
    },
    age: {
      type: Number,
    },
    parentName: {
      type: String,
      required: function() {
        // Only required if user is under 18
        return this.age < 18;
      }
    },
    parentPhone: {
      type: String,
      required: function() {
        // Only required if user is under 18
        return this.age < 18;
      }
    },
    parentEmail: {
      type: String,
      required: function() {
        // Only required if user is under 18
        return this.age < 18;
      },
      match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email'],
    },
    discordUsername: {
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

// Calculate age from dateOfBirth before saving
UserSchema.pre('save', function(next) {
  if (this.dateOfBirth) {
    this.age = calculateAge(this.dateOfBirth);
  }
  next();
});

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
