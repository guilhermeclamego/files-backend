const mongoose = require('mongoose');

const Box = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        files: [ { type: mongoose.Schema.Types.ObjectId, ref: "File" }]
    }, 
    {
        timestamps: true //isso faz criar campos de data de criação e alteração automaticos para cada registro
    }
);

module.exports = mongoose.model('Box', Box);