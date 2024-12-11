const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    completed: { type: Boolean, default: false } // Field to track completion status
});

module.exports = mongoose.model('Task', taskSchema);
