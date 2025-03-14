import mongoose from 'mongoose';

const EventRegistrationSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    event: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Event',
      required: true,
    },
    hasTeam: {
      type: Boolean,
      required: true,
    },
    teamSize: {
      type: Number,
    },
    teamMemberNames: {
      type: String,
    },
    teamName: {
      type: String,
    },
    needsTeam: {
      type: Boolean,
    },
    discordTag: {
      type: String,
    },
    experience: {
      type: String,
      enum: ['Beginner', 'Intermediate', 'Advanced'],
    },
    referralSource: {
      type: String,
    },
    questions: {
      type: String,
    },
    additionalInfo: {
      type: String,
    },
    status: {
      type: String,
      enum: ['registered', 'confirmed', 'cancelled'],
      default: 'registered',
    },
  },
  { timestamps: true }
);

// Ensure one registration per user per event
EventRegistrationSchema.index({ user: 1, event: 1 }, { unique: true });

export default mongoose.models.EventRegistration || mongoose.model('EventRegistration', EventRegistrationSchema);
