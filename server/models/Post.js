const { Schema, model } = require('mongoose');

const postSchema = new Schema(
  {
    text: {
      type: String,
      required: true
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: 'User'
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

  const Post = model('Post', postSchema);

  module.exports = Post;