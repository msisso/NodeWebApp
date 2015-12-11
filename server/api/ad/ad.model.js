/**
 * Created by Maor on 12/9/2015.
 */


var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var AdSchema = new Schema({
    msgName: String,
    msgData: [String],
    msgImage: [String],
    linkTemplate: String,
    advTimer: Number,
    when: Schema.Types.Mixed,
    screensId: { type: [String], index: true }
});

module.exports = mongoose.model('Ad', AdSchema,'Advertises');
