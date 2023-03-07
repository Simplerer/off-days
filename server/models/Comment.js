const { Schema, model } = require('mongoose');

const commentschema = new Schema(
  {
    text: {
      type: String,
      required: true
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    post: {
      type: Schema.Types.ObjectId,
      ref: 'Post'
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: value => value.toDateString()
    }
  },
  {
    toJSON: {
      getters: true
    },
    id: false
  }
  );

  const Comment = model('Comment', commentschema);

  module.exports = Comment;