import mongoose from "mongoose";

const connectToMongoDB = async () => {
  try {
    const connection = await mongoose.connect(process.env.MongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`MongoDB connected: ${connection.connection.host}`);
  } catch (err) {
    console.log(err);
  }
}

export default connectToMongoDB;