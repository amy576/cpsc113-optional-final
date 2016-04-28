var mongoose = require('mongoose');

var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var descriptionField = {
    type: String,
    minlength: 0,
    maxlength: 5000
};

var ChatSchema = new Schema({
    description: descriptionField
});

module.exports = mongoose.model('Chats', ChatSchema);