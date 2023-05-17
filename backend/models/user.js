const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema(
  {
    task_name: {
      type: String,
      required: true,
      trim: true,
    },
    task_description: {
      type: String,
      required: true,
      trim: true,
      validate(value) {
        if (value.length < 2)
          throw new Error("Invalid job, must be at least 2 characters.");
      },
    },
    days: {
      type: Number,
      required: true,
    },
    difficulty: {
      type: Number,
      required: true,
    },
    stress_rating: {
      type: Number,
      required: true,
    },
    priority: {
      type: Number,
      required: false,
    },
  },
  { collection: "task_list" }
);

TaskSchema.pre("save", function (next) {
  this.priority = this.calculatePriority();
  next();
});

TaskSchema.methods.calculatePriority = function () {
  return this.difficulty + this.stress_rating - this.days;
};

TaskSchema.statics.sortPriority = function (callback) {
  return this.find({}).sort({ priority: -1 }).exec(callback);
};

const Task = mongoose.model("Task", TaskSchema);

module.exports = Task;
