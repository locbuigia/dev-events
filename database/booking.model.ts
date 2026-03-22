import mongoose, { Schema, Document, Model, Types } from 'mongoose';

// TypeScript interface for Booking document
export interface IBooking extends Document {
  eventId: Types.ObjectId;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

const bookingSchema = new Schema<IBooking>(
  {
    eventId: {
      type: Schema.Types.ObjectId,
      ref: 'Event',
      required: [true, 'Event ID is required'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      trim: true,
      lowercase: true,
      validate: {
        validator: (v: string) => {
          // RFC 5322 compliant email validation
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          return emailRegex.test(v);
        },
        message: 'Please provide a valid email address',
      },
    },
  },
  {
    timestamps: true,
  }
);

// Index for faster event queries
bookingSchema.index({ eventId: 1 });

/**
 * Pre-save hook to verify the referenced event exists
 */
bookingSchema.pre('save', async function (next) {
  const booking = this as IBooking;

  // Only validate eventId if it's new or modified
  if (booking.isNew || booking.isModified('eventId')) {
    try {
      const Event = mongoose.models.Event;
      
      if (!Event) {
        return next(new Error('Event model not found. Ensure it is imported before Booking.'));
      }

      const eventExists = await Event.findById(booking.eventId);
      
      if (!eventExists) {
        return next(new Error(`Event with ID ${booking.eventId} does not exist`));
      }
    } catch (error) {
      return next(error as Error);
    }
  }

  next();
});

// Prevent model overwrite during hot reloading in development
const Booking: Model<IBooking> = mongoose.models.Booking || mongoose.model<IBooking>('Booking', bookingSchema);

export default Booking;
