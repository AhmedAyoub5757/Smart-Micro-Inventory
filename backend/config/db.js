import mongoose from "mongoose";

const connectDB =  async () => {
    try{
        const conn = await mongoose.connect(process.env.URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
        console.log(`connect to db: ${conn.connection.host}`);
    }
    catch(err){
        console.log(`Error Connecting to db: ${err.message}`)
        process.exit(1);
    }
}

export default connectDB;
