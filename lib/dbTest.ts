import { connectToDb } from "@/lib/db";
import mongoose from "mongoose";

export const testDbConnection = async () => {
  try {
    await connectToDb();

    // Check connection status
    const state = mongoose.connection.readyState;
    console.log("Connection state:", state);
    // 0 = disconnected
    // 1 = connected
    // 2 = connecting
    // 3 = disconnecting

    if (state === 1) {
      return "Database connection successful";
    } else {
      throw new Error(`Database not connected. State: ${state}`);
    }
  } catch (error) {
    console.error("Database connection test failed:", error);
    throw error;
  }
};
