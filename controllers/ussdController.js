const User = require("../models/user");
const Doctor = require("../models/doctor");
const Appointment = require("../models/appointment");
const africastalking = require("../config/africastalking");

const sms = africastalking.SMS;

exports.handleUSSD = (req, res) => {
  const { sessionId, serviceCode, phoneNumber, text } = req.body;
  let response = "";

  // Log the incoming request
  console.log("Received USSD request:", {
    sessionId,
    serviceCode,
    phoneNumber,
    text,
  });

  let parts = text.split("*");

  if (text === "") {
    response = `CON Welcome to the Health Appointment System
1. Book an appointment
2. Contact a doctor`;
  } else if (text === "1") {
    response = `CON Enter your name:`;
  } else if (parts.length === 2) {
    const name = parts[1];
    response = `CON Hi ${name}, select a doctor:
1. Dr. Smith
2. Dr. Jane`;
  } else if (parts.length === 3) {
    const doctorName = parts[2] === "1" ? "Dr. Smith" : "Dr. Jane";
    response = `CON You selected ${doctorName}. Enter your preferred date (YYYY-MM-DD):`;
  } else if (parts.length === 4) {
    const date = parts[3];
    // TODO: Validate date
    const newAppointment = new Appointment({
      name: parts[1],
      doctor: parts[2],
      date,
    });
    newAppointment.save((err) => {
      if (err) {
        console.error("Error saving appointment:", err);
        response = "END There was an error booking your appointment. Please try again.";
      } else {
        // Send SMS confirmation
        const message = `Your appointment with ${parts[2] === "1" ? "Dr. Smith" : "Dr. Jane"} is booked for ${date}. Thank you!`;
        sms.send({ to: phoneNumber, message: message })
          .then((smsResponse) => {
            console.log("SMS sent successfully:", smsResponse);
          })
          .catch((smsError) => {
            console.error("Error sending SMS:", smsError);
          });
        response = `END Your appointment is booked for ${date}. A confirmation SMS has been sent to you. Thank you!`;
      }
      // Send response to Africa's Talking
      res.set("Content-Type", "text/plain");
      res.send(response);
    });
    // Return early to prevent sending the response twice
    return;
  }
  // TODO: Handle other cases

  // Send response to Africa's Talking
  res.set("Content-Type", "text/plain");
  res.send(response);
};