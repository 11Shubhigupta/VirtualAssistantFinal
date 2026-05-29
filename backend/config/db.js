import mongoose from "mongoose"

let cachedConnection = null;

const connectDb = async () => {
    if (!process.env.MONGODB_URL) {
        console.error("Error: MONGODB_URL environment variable is not defined!");
        return;
    }

    if (cachedConnection && mongoose.connection.readyState === 1) {
        console.log("Using cached database connection");
        return cachedConnection;
    }

    try {
        console.log("Connecting to database...");
        cachedConnection = await mongoose.connect(process.env.MONGODB_URL, {
            serverSelectionTimeoutMS: 30000,
            socketTimeoutMS: 45000,
            family: 4
        });
        console.log("db connected");
        return cachedConnection;
    } catch (error) {
        console.error("db connection failed:", error);
        cachedConnection = null;
    }
}

export default connectDb