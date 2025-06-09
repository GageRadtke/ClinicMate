const request = require("supertest");
const app = require("../index"); // adjust if needed
const mongoose = require("mongoose");
const User = require("../models/User");
const Appointment = require("../models/Appointment");
require("dotenv").config();

let token, doctorToken;
let patientId, doctorId;

describe("Appointment Endpoints", () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    await User.deleteMany({});
    await Appointment.deleteMany({});

    // Create patient
    const patient = await request(app)
      .post("/api/auth/register")
      .send({
        first_name: "Patient",
        last_name: "One",
        email: "patient1@example.com",
        password: "password123",
        phone_number: "1111111111",
        address: "123 Patient St",
        date_of_birth: "1995-05-05",
        gender: "Female",
        role: "patient"
      });
    token = patient.body.token;
    patientId = patient.body._id;

    // Create doctor
    const doctor = await request(app)
      .post("/api/auth/register")
      .send({
        first_name: "Doctor",
        last_name: "One",
        email: "doctor1@example.com",
        password: "password123",
        phone_number: "2222222222",
        address: "456 Doctor Ave",
        date_of_birth: "1980-02-02",
        gender: "Male",
        role: "doctor"
      });
    doctorToken = doctor.body.token;
    doctorId = doctor.body._id;
  });

  afterAll(async () => {
    await User.deleteMany({});
    await Appointment.deleteMany({});
    await mongoose.connection.close();
  });

  it("should create a new appointment", async () => {
    const res = await request(app)
      .post("/api/appointments")
      .set("Authorization", `Bearer ${token}`)
      .send({
        doctor_id: doctorId,
        dateTime: "2025-07-01T10:00:00Z"
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty("appointment_id");
  });

  it("doctor should retrieve their appointments", async () => {
    const res = await request(app)
      .get("/api/appointments")
      .set("Authorization", `Bearer ${doctorToken}`);
    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});
