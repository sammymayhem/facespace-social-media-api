const mongoose = require('mongoose');
const { Schema, model } = require('mongoose');
const User = require('./User');
const reactionSchema = require('./Reaction');
const moment = require('moment');

const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 280,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: (createdAt) => moment(createdAt).format("MMM DD, YYYY [at] hh:mm a")
        },
        username: {
            type: String,
            postedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
            required: true,
        },
        reactions: [reactionSchema],
    },
    {
        toJSON: {
            virtuals: true,
            getters: true,
        },
        id: false,
    }
);

thoughtSchema.virtual('reactionCount').get(function () {
    return `Total reactions: ${this.reactions.length}`;
});

const Thought = model('thought', thoughtSchema);

module.exports = Thought;