const express = require("express");

const {
  createWorkout,
  getSingle,
  getWorkouts,
  updateWorkout,
  deleteWorkout,
} = require("../controllers/workoutController");
const router = express.Router();
router.get("/", getWorkouts);
router.get("/:id", getSingle);
router.post("/", createWorkout);
router.delete("/:id", deleteWorkout);
router.patch("/:id", updateWorkout);

module.exports = router;
