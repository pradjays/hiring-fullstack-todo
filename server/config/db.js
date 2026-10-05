import mongoose from 'mongoose';

export const connectDB = async () => {
    try {
        const connection = await mongoose.connect(process.env.MONGODB_URI);
        console.log("MongoDB Connected at: ", connection.connection.host);
    } catch (e) {
        console.log(e);
        process.exit(1);
    }
}