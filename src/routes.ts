import express, {Request, Response} from "express";
import {StatusCodes} from "http-status-codes"
import { Appointment } from "./modals/appointment";
import { getAllAppointments, getAppointment, makeReservation } from "./services/registrationService";

export const router = express.Router()
const timeLog = (_req: any, _res: any, next: () => void) => {
    console.log('Time: ', Date.now())
    next()
  }
router.use(timeLog)

router.get('/all', (req, res) => {
    getAllAppointments().then((data) => {
        console.log(data);
        res.status(StatusCodes.OK).json({message: 'Success', data: data})
    }).catch((error) => {
        console.log("Error while fetching appointment list", error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message: 'Error while fetching appointment list'})
    });
})

router.get('/', (req, res) => {
    const appointment: Appointment = {
        doctorId: +(req.query.doctorId as string),
        patientId: +(req.query.patientId as string),
        time: req.query.time as string,
        id: req.query.id as string,
        title: req.query.title as string

    }
    getAppointment(appointment).then((data) => {
        res.status(StatusCodes.CREATED).json({message: 'Patient registered successfully !', data: data})
    }).catch((error) => {
        console.log("Error while fetching patient list", error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message: 'Error while fetching patient list'})
    });
})

router.post("/make-reservation", (req : Request, res : Response) => {
    try {
        makeReservation(req.body).then(() => {
            res.status(StatusCodes.CREATED).json({message: 'Patient registered successfully !'})
        }).catch((error) => {
            console.log("Error while adding the patient");
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message: 'Error while adding the patient'})
        });
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({error})
    }
});