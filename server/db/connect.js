import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config();
let cached = global.mongoose;

if (!cached) {
	cached = global.mongoose = { conn: null, promise: null};
}

export default async function connectDB(){
	try {

		if (cached.conn) return cached.conn;
	
		if(!cached.promise){ 
			cached.promise = mongoose.connect(process.env.DATABASE_URI, {
				bufferCommands: false
			})
		}
	} catch (error) {
		console.log('error: ', error);
	}

	cached.conn = await cached.promise;
	return cached.conn;
};

