import mongoose, { Schema } from "mongoose";

const todoSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      unique: false,
      maxlength: 255,
    },

    description: {
      type: String,
      required: true,
      unique: false,
      maxlength: 255,
    },

    userId: {
      type: String,
      required: true,
      unique: false,
      index: true,
    },

    isCompleted: {
      type: Boolean,
      default: false,
    },

    isActive: {
      type: Boolean,
      default: true,
      index: true,
    },
  },
  { timestamps: true }
);

const Todo = mongoose.model("Todo", todoSchema);

export { Todo };
