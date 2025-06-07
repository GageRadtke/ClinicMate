const request = require("supertest");
const app = require("../index"); // adjust if necessary
const mongoose = require("mongoose");
const User = require("../models/User");
require("dotenv").config();

describe("Auth Endpoints", () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    await User.deleteMany({});
  });

  afterAll(async () => {
    await User.deleteMany({});
    await mongoose.connection.close();
  });

  it("should register a new user", async () => {
    const res = await request(app)
      .post("/api/auth/register")
      .send({
        first_name: "Test",
        last_name: "User",
        email: "testuser@example.com",
        password: "password123",
        phone_number: "1234567890",
        address: "123 Main St",
        date_of_birth: "1990-01-01",
        gender: "Other",
        role: "patient"
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty("token");
  });

  it("should login existing user", async () => {
    const res = await request(app)
      .post("/api/auth/login")
      .send({
        email: "testuser@example.com",
        password: "password123"
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("token");
  });
});
