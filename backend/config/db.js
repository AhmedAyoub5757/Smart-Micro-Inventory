import mongoose from "mongoose";

const connectDB =  async () => {
    try{
        const conn = await mongoose.connect(process.env.URI)
        console.log(`connect to db: ${conn.connection.host}`);
    }
    catch(err){
        console.log(`Error Connecting to db: ${err.msg}`)
        process.exit(1);
    }
}

export default connectDB;
