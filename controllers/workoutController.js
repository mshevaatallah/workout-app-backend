const Workout = require("../models/workoutModel");
// get all workout
const getWorkouts = async (req, res) => {
  const user_id = req.user._id;
  const workout = await Workout.find({ user_id }).sort({ createdAt: -1 });
  res.status(200).json(workout);
};
// get single workout
const getSingle = async (req, res) => {
  const { id } = req.params;
  const workout = await Workout.findById(id);
  if (!workout) {
    return res.status(404).json({ error: "no such document" });
  }
  res.status(200).json(workout);
};
// post new workout
const createWorkout = async (req, res) => {
  const { title, load, reps } = req.body;
  try {
    const user_id = req.user._id;
    const workout = await Workout.create({ title, load, reps, user_id });
    res.status(200).json(workout);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
// delete workout
const deleteWorkout = async (req, res) => {
  const { id } = req.params;
  const workout = await Workout.findOneAndDelete({ _id: id });
  if (!workout) {
    return res.status(400).json({ error: "no such document" });
  }
  res.status(200).json(workout);
};
// update a workout
const updateWorkout = async (req, res) => {
  const { id } = req.params;
  const workout = await Workout.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );
  if (!workout) {
    return res.status(400).json({ error: "no such document" });
  }

  res.status(200).json(workout);
};

module.exports = {
  createWorkout,
  getSingle,
  getWorkouts,
  deleteWorkout,
  updateWorkout,
};
