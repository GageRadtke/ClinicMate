const request = require("supertest");
const app = require("../index"); // adjust path if needed
const mongoose = require("mongoose");
const User = require("../models/User");
const Prescription = require("../models/Prescription");
require("dotenv").config();

let doctorToken, patientToken;
let doctorId, patientId;

describe("Prescription Endpoints", () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    await User.deleteMany({});
    await Prescription.deleteMany({});

    // Create doctor
    const doctor = await request(app)
      .post("/api/auth/register")
      .send({
        first_name: "Doc",
        last_name: "Smith",
        email: "docsmith@example.com",
        password: "password123",
        phone_number: "5555555555",
        address: "111 Doctor Dr",
        date_of_birth: "1985-05-05",
        gender: "Male",
        role: "doctor"
      });
    doctorToken = doctor.body.token;
    doctorId = doctor.body._id;

    // Create patient
    const patient = await request(app)
      .post("/api/auth/register")
      .send({
        first_name: "Patient",
        last_name: "Jones",
        email: "patientjones@example.com",
        password: "password123",
        phone_number: "6666666666",
        address: "222 Patient Pkwy",
        date_of_birth: "1990-06-06",
        gender: "Female",
        role: "patient"
      });
    patientToken = patient.body.token;
    patientId = patient.body._id;
  });

  afterAll(async () => {
    await User.deleteMany({});
    await Prescription.deleteMany({});
    await mongoose.connection.close();
  });

  it("doctor should create a new prescription", async () => {
    const res = await request(app)
      .post("/api/prescriptions")
      .set("Authorization", `Bearer ${doctorToken}`)
      .send({
        patient_id: patientId,
        medications: [
          { name: "Medicine A", dosage: "10mg", frequency: "Once a day" }
        ]
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty("prescription_id");
  });

  it("patient should retrieve prescriptions", async () => {
    const res = await request(app)
      .get("/api/prescriptions")
      .set("Authorization", `Bearer ${patientToken}`);
    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});
