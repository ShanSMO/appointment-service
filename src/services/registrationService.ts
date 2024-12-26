import { MongoClient } from "mongodb";
import * as dotevnv from "dotenv";
import { Appointment } from "../modals/appointment";

dotevnv.config()

const connectionUri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASS}@cccw-cluster.r4djh.mongodb.net/?retryWrites=true&w=majority&appName=CCCW-cluster`;
const client = new MongoClient(connectionUri);
const dbName = process.env.DB_NAME;
const collectionName = "doctors";
const database = client.db(dbName);
const collection = database.collection(collectionName);

export const makeReservation = async (appointment: Appointment) => {
    await client.connect();
    const obj = await collection.insertOne(appointment);
    console.log(`Added appointment record - ${appointment.id}`, obj.insertedId)
}

export const getAllAppointments = async () => {
    await client.connect();
    const patients = await collection.find().toArray();
    return patients;
}

export const getAppointment = async (appointment: Appointment) => {
    const query = {id: appointment.id, patientId: appointment.patientId};
    await client.connect();
    const patients = await collection.findOne(query);
    return patients;
}