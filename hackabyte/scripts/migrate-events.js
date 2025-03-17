/**
 * Event Migration Script
 * 
 * This script takes the static events from src/lib/data/upcomingEvents.js
 * and inserts them into the MongoDB database.
 */
import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';
import { upcomingEvents } from '../src/lib/data/upcomingEvents.js';
import path from 'path';
import { fileURLToPath } from 'url';

// Load environment variables from .env.local
dotenv.config({ path: '.env.local' });

// Get directory name in ES Module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Helper function to parse date string like "March 8-9, 2025" into start and end dates
function parseDateRange(dateString) {
  const months = {
    January: 0, February: 1, March: 2, April: 3, May: 4, June: 5,
    July: 6, August: 7, September: 8, October: 9, November: 10, December: 11
  };

  // Match pattern like "March 8-9, 2025" or "March 29-30, 2025"
  const regex = /(\w+)\s+(\d+)-(\d+),\s+(\d+)/;
  const match = dateString.match(regex);

  if (match) {
    const month = months[match[1]];
    const startDay = parseInt(match[2]);
    const endDay = parseInt(match[3]);
    const year = parseInt(match[4]);

    const startDate = new Date(year, month, startDay);
    const endDate = new Date(year, month, endDay);

    return { startDate, endDate };
  }

  // If no match, return null
  return null;
}

async function migrateEvents() {
  // MongoDB connection string
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.error('No MONGODB_URI found in environment variables');
    process.exit(1);
  }

  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log('Connected to MongoDB');

    const database = client.db();
    const eventsCollection = database.collection('events');

    // Check if we already have events in the database
    const existingCount = await eventsCollection.countDocuments();
    console.log(`Found ${existingCount} existing events in the database`);

    // Prepare events for insertion
    const eventsToInsert = upcomingEvents.map(event => {
      // Parse date range
      const dates = parseDateRange(event.date);
      if (!dates) {
        console.error(`Could not parse date range: ${event.date}`);
        return null;
      }

      // Extract registration deadline (1 day before start date)
      const registrationDeadline = new Date(dates.startDate);
      registrationDeadline.setDate(registrationDeadline.getDate() - 1);

      // Create the event document
      return {
        name: event.title,
        description: event.description,
        location: event.location,
        startDate: dates.startDate,
        endDate: dates.endDate,
        status: 'upcoming',
        maximumParticipants: 100, // Default value
        registrationDeadline: registrationDeadline,
        // Additional fields from static events
        state: event.state,
        ageGroups: event.ageGroups,
        image: event.image,
        eventType: event.eventType,
        competitionLevel: event.competitionLevel,
        createdAt: new Date(),
        updatedAt: new Date()
      };
    }).filter(Boolean); // Remove any null entries

    if (eventsToInsert.length === 0) {
      console.log('No events to insert');
      return;
    }

    // Insert the events
    const result = await eventsCollection.insertMany(eventsToInsert);
    console.log(`${result.insertedCount} events were inserted into the database`);

    // Print details of the imported events
    console.log('\nImported events:');
    eventsToInsert.forEach((event, index) => {
      console.log(`${index + 1}. ${event.name} (${event.startDate.toLocaleDateString()} - ${event.endDate.toLocaleDateString()})`);
    });

  } catch (error) {
    console.error('Error migrating events:', error);
  } finally {
    await client.close();
    console.log('Database connection closed');
  }
}

// Run the migration
migrateEvents().catch(console.error);
