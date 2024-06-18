import mongoose from "mongoose";

// Función para conectar a la base de datos
export async function connectDB() {
  try {
    await mongoose.connect(process.env.DB_URI, {
      /*useNewUrlParser: true,
      useUnifiedTopology: true,*/
      //useFindAndModify: false,
      //useCreateIndex: true,
      autoIndex: false,
      //poolSize: 10
    });
    console.log("MongoDB connected successfully");
  } catch (err) {
    console.error("Error connecting to MongoDB", err);
    process.exit(1);
  }
}
