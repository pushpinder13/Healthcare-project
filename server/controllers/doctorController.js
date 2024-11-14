// const asyncHandler = require("express-async-handler");
// const Doctor = require("../models/doctorModels");

// // Register a new doctor
// const registerDoctor = asyncHandler(async (req, res) => {
//   const { name, email, specialty, phoneNumber, experience, address } = req.body;

//   if (!name || !email || !specialty || !phoneNumber || !experience || !address) {
//     res.status(400);
//     throw new Error("Please provide all required fields");
//   }

//   // Check if doctor already exists
//   const doctorExists = await Doctor.findOne({ email });
//   if (doctorExists) {
//     return res.status(400).json({ message: "Doctor already exists with this email" });
//   }

//   // Create a new doctor instance
//   const newDoctor = await Doctor.create({
//     name,
//     email,
//     specialty,
//     phoneNumber,
//     experience,
//     address
//   });

//   res.status(201).json({
//     message: "Doctor registered successfully",
//     doctor: newDoctor
//   });
// });

// //get all docs
// const getAllDoctors = asyncHandler(async (req, res) => {
//   const doctors = await Doctor.find();
//   res.status(200).json(doctors);
// })
// //get doctor by id
// const getDoctorbyId = asyncHandler(async (req, res) => {
//   const doctor = await Doctor.findById(req.params.id);

//   if (!doctor) {
//     res.status(404);
//     throw new Error("Doctor not found");
//   }
//   res.status(200).json(doctor);
// });
// const token = generateJwtToken({
//   id: newDoctor._id,
//   name: newDoctor.name,
//   email: newDoctor.email,
//   speciality: newDoctor.speciality,
//   phoneNumber: newDoctor.phoneNumber,
//   experience: newDoctor.experience,
//   address: newDoctor.address,
// })


// module.exports = { registerDoctor, getAllDoctors, getDoctorbyId };

const asyncHandler = require("express-async-handler");
const Doctor = require("../models/doctorModels");
const jwt = require("jsonwebtoken");  // Assuming you are using JWT for token generation

// Function to generate JWT token
const generateJwtToken = (doctor) => {
  return jwt.sign(
    {
      id: doctor._id,
      name: doctor.name,
      email: doctor.email,
      specialty: doctor.specialty,
      phoneNumber: doctor.phoneNumber,
      experience: doctor.experience,
      address: doctor.address
    },
    process.env.JWT_SECRET,  // Ensure you have JWT_SECRET in your .env file
    { expiresIn: "1h" }  // You can adjust the expiration time
  );
};

// Register a new doctor
const registerDoctor = asyncHandler(async (req, res) => {
  const { name, email, specialty, phoneNumber, experience, address } = req.body;

  if (!name || !email || !specialty || !phoneNumber || !experience || !address) {
    res.status(400);
    throw new Error("Please provide all required fields");
  }

  // Check if doctor already exists
  const doctorExists = await Doctor.findOne({ email });
  if (doctorExists) {
    return res.status(400).json({ message: "Doctor already exists with this email" });
  }

  // Create a new doctor instance
  const newDoctor = await Doctor.create({
    name,
    email,
    specialty,
    phoneNumber,
    experience,
    address
  });

  // Generate JWT Token
  const token = generateJwtToken(newDoctor);

  res.status(201).json({
    message: "Doctor registered successfully",
    doctor: newDoctor,
    token  // Send the JWT token to the client
  });
});

// Get all doctors
const getAllDoctors = asyncHandler(async (req, res) => {
  const doctors = await Doctor.find();
  res.status(200).json(doctors);
});

// Get doctor by id
const getDoctorById = asyncHandler(async (req, res) => {
  const doctor = await Doctor.findById(req.params.id);

  if (!doctor) {
    res.status(404);
    throw new Error("Doctor not found");
  }
  res.status(200).json(doctor);
});

module.exports = { registerDoctor, getAllDoctors, getDoctorById };
