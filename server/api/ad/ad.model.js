/**
 * Created by Maor on 12/9/2015.
 */


var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var AdSchema = new Schema({
    msgName: {
        type: String,
        trim: true,
        unique: true,
        required: true
    },
    msgData: {
        type: [String],
        trim: true
    },
    msgImage: [String],
    linkTemplate: String,
    templateName: {
        type: [String],
        enum: ['A', 'B', 'C'],
        required: true
    },
    advTimer: {
        type: Number,
        required: true
    },
    when: {
        type: Schema.Types.Mixed,
        required: true
    },
    screensId: {
        type: [String],
        index: true,
        required:true,
    }
});

var Ads = mongoose.model('Ad', AdSchema,'Advertises');
require('./ad.validators.js')(Ads);

module.exports = Ads;
