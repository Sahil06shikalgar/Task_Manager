const mangoose = require("mongoose");


const todoSchema = new mangoose.Schema({
    text: { type: String, required: true },
    completed: { type: Boolean, default: false },
});

const TaskSchema = new mangoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    priority: { type: String, enum: ["Low", "Medium", "High"], default: "Medium" },
    status: { type: String, enum: ["Pending", "In-Progress", "Done"], default: "Pending" },
    dueDate: { type: Date, required: true },
    assignedTo: [{ type: mangoose.Schema.Types.ObjectId, ref: "User", required: true }],
    createdBy: { type: mangoose.Schema.Types.ObjectId, ref: "User", required: true },
     attachments: [{
    fileName: { type: String, required: true },
    fileUrl: { type: String, required: true }
  }],
    todoChecklist: [todoSchema],
    progress: { type: Number, default: 0 },
}
, { timestamps: true }
);


module.exports = mangoose.model("Task", TaskSchema);