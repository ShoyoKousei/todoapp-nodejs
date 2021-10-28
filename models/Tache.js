const mongoose = require('mongoose');
const tacheSchema = new mongoose.Schema({
    message: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
})
module.exports=mongoose.model('Tache',tacheSchema);