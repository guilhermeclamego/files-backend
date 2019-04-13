const mongoose = require('mongoose');

const File = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true
        },
        path: {
            type: String,
            required: true
        },
    },
    {
        timestamps: true, //isso faz criar campos de data de criação e alteração automaticos para cada registro
        toObject: { virtuals: true },
        toJSON: { virtuals: true }        
    }
);

File.virtual('url').get(function() {
    return `http://localhos:3333/files/${encodeURIComponent(this.path)}`
});

module.exports = mongoose.model('File', File);