import mongoose from "mongoose";

const dbConnection = async() => {
	try {
        await mongoose.connect(process.env.MONGO_URI!);
        console.log("MONGODB CONNECTED");
    } catch (error) {
        console.log("ERROR TO CONNECT MONGODB");
    }
}
export default dbConnection;