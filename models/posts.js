var mongoose = require('mongoose');

var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var descriptionField = {
    type: String,
    minlength: 0,
    maxlength: 5000
};

var PostSchema = new Schema({
    postid: { type: Number, min: 0, max: 1000 }
    description: descriptionField
});

module.exports = mongoose.model('Posts', PostSchema);