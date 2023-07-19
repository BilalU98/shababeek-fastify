import { connectToDatabase } from "./database/connection";
import { connectToServer } from "./server";

export default async function startApplication() {
  connectToServer();
  connectToDatabase();
}
