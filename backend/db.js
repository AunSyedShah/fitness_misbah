import mongoose from 'mongoose';

const connect_db = async () => {
  try {
    await mongoose.connect(process.env.MONGO_DB);
    console.log('Connected to database');
  } catch (error) {
    console.error('Database connection error:', error);
    process.exit(1);
  }
};

export default connect_db;
