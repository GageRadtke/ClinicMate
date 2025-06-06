const request = require("supertest");
const app = require("../index"); // adjust accordingly
const mongoose = require("mongoose");
const User = require("../models/User");
const Message = require("../models/Message");
require("dotenv").config();

let senderToken, recipientToken;
let senderId, recipientId;

describe("Message Endpoints", () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    await User.deleteMany({});
    await Message.deleteMany({});

    // Create sender (patient)
    const sender = await request(app)
      .post("/api/auth/register")
      .send({
        first_name: "Sender",
        last_name: "One",
        email: "sender@example.com",
        password: "password123",
        phone_number: "3333333333",
        address: "789 Sender Rd",
        date_of_birth: "1992-03-03",
        gender: "Other",
        role: "patient"
      });
    senderToken = sender.body.token;
    senderId = sender.body._id;

    // Create recipient (doctor)
    const recipient = await request(app)
      .post("/api/auth/register")
      .send({
        first_name: "Recipient",
        last_name: "One",
        email: "recipient@example.com",
        password: "password123",
        phone_number: "4444444444",
        address: "101 Recipient Ln",
        date_of_birth: "1975-04-04",
        gender: "Male",
        role: "doctor"
      });
    recipientToken = recipient.body.token;
    recipientId = recipient.body._id;
  });

  afterAll(async () => {
    await User.deleteMany({});
    await Message.deleteMany({});
    await mongoose.connection.close();
  });

  it("should send a secure message", async () => {
    const res = await request(app)
      .post("/api/messages")
      .set("Authorization", `Bearer ${senderToken}`)
      .send({
        recipient_id: recipientId,
        content: "Test secure message"
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty("message_id");
  });

  it("should retrieve messages for user", async () => {
    const res = await request(app)
      .get("/api/messages")
      .set("Authorization", `Bearer ${recipientToken}`);
    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});
