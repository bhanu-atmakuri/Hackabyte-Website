// Auth utility bridge file
// This file imports and re-exports the database modules
// to solve path resolution issues
import mongodb from '../../../../lib/mongodb';
import userModel from '../../../../models/User';

// Re-export the db connection
export const dbConnect = mongodb;

// Re-export the User model
export const User = userModel;
