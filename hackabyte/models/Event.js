import mongoose from 'mongoose';

const EventSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide an event name'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Please provide an event description'],
    },
    location: {
      type: String,
      required: [true, 'Please provide an event location'],
    },
    startDate: {
      type: Date,
      required: [true, 'Please provide a start date'],
    },
    endDate: {
      type: Date,
      required: [true, 'Please provide an end date'],
    },
    status: {
      type: String,
      enum: ['upcoming', 'ongoing', 'completed'],
      default: 'upcoming',
    },
    maximumParticipants: {
      type: Number,
    },
    registrationDeadline: {
      type: Date,
    },
    // Added fields from static events
    state: {
      type: String,
      trim: true,
    },
    ageGroups: {
      type: [String],
      default: [],
    },
    image: {
      type: String,
      default: '/api/placeholder/600/400',
    },
    eventType: {
      type: String,
      default: 'Hackathon',
    },
    competitionLevel: {
      type: String,
      enum: ['National', 'State', 'Regional'],
      default: 'State',
    },
    prizes: [
      {
        name: String,
        description: String,
        value: String,
      },
    ],
    requirements: [String],
    theme: String,
    discordLink: String,
  },
  { timestamps: true }
);

export default mongoose.models.Event || mongoose.model('Event', EventSchema);
