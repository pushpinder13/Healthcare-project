// const express = require("express");
// const router = express.Router();
// const { registerDoctor, getAllDoctors, getDoctorbyId } = require("../controllers/doctorController");

// const { jwtAuthMiddleware } = require("../middleware/jwtAuthMiddleware")
// router.post("/register", jwtAuthMiddleware, registerDoctor);
// //get all docs
// router.get("/", getAllDoctors);

// router.get('/:id', getDoctorbyId);



const express = require("express");
const router = express.Router();

// Import the doctor controller functions
const { registerDoctor,loginDoctor, getAllDoctors, getDoctorById } = require("../controllers/doctorController");

// Import the JWT middleware to protect routes
const { validatetoken } = require("../middleware/jwtAuthMiddleware");

// Protected route: Register a new doctor (requires JWT authentication)
router.post("/register", registerDoctor);

// Public routes: Get all doctors and get doctor by ID
router.get("/", getAllDoctors);
router.get("/:id", getDoctorById);
router.post('/login',loginDoctor);
module.exports = router;
