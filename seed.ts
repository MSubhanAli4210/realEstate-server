import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import User from './models/user.js';
import Listing from './models/listing.js';

dotenv.config();

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB connected for seeding');

    // Clear existing data (optional — comment out if you want to keep existing data)
    await Listing.deleteMany({});
    console.log('Cleared existing listings');

    // Create a seed user (or reuse an existing one)
    let seedUser = await User.findOne({ email: 'demo@haven.com' });
    if (!seedUser) {
      seedUser = await User.create({
        username: 'demoagent',
        email: 'demo@haven.com',
        password: 'password123', // will be hashed by your pre('save') hook
        role: 'agent',
      });
      console.log('Created seed user: demo@haven.com / password123');
    }

    const listings = [
      {
        title: 'Modern Downtown Loft',
        location: 'Lahore, Punjab',
        price: 18500000,
        bedrooms: 2,
        images: ['https://images.unsplash.com/photo-1600585154340-be6161a56a0c'],
        owner: seedUser._id,
      },
      {
        title: 'Sunlit Family Villa',
        location: 'DHA Phase 6, Lahore',
        price: 45000000,
        bedrooms: 4,
        images: ['https://images.unsplash.com/photo-1600596542815-ffad4c1539a9'],
        owner: seedUser._id,
      },
      {
        title: 'Cozy Garden Cottage',
        location: 'Gulberg, Lahore',
        price: 12000000,
        bedrooms: 1,
        images: ['https://images.unsplash.com/photo-1600607687939-ce8a6c25118c'],
        owner: seedUser._id,
      },
      {
        title: 'Contemporary City Apartment',
        location: 'Islamabad, F-7',
        price: 27000000,
        bedrooms: 3,
        images: ['https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea'],
        owner: seedUser._id,
      },
      {
        title: 'Spacious Suburban House',
        location: 'Bahria Town, Lahore',
        price: 35000000,
        bedrooms: 5,
        images: ['https://images.unsplash.com/photo-1600585154526-990dced4db0d'],
        owner: seedUser._id,
      },
      {
        title: 'Minimalist Studio Flat',
        location: 'Model Town, Lahore',
        price: 8500000,
        bedrooms: 1,
        images: ['https://images.unsplash.com/photo-1502672260266-1c1ef2d93688'],
        owner: seedUser._id,
      },
    ];

    await Listing.insertMany(listings);
    console.log(`Seeded ${listings.length} listings`);

    console.log('Seeding complete');
    process.exit(0);
  } catch (err) {
    console.error('Seeding failed:', err);
    process.exit(1);
  }
};

seed();

