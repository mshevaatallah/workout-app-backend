require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const workoutRoutes = require("./routes/workout");
app.use(express.json());
//middleware
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});
//routes
app.use("/api/workouts", workoutRoutes);

//mongodb
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log("server and database online at port ", process.env.PORT);
    });
  })
  .catch((err) => {
    console.log(err);
  });
