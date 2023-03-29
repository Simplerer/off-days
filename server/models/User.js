const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

const likeSchema = require('./Likes');
const Post = require('./Post');

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/.+@.+\..+/, 'Must use a valid email address']
    },
    password: {
      type: String,
      required: true,
    },
    homeTown: {type: String},
    state: {type: String},
    posts: [Post.schema],
    likes: [likeSchema]
  },
  {
    virtuals: true
  }
  );

  userSchema.pre('save', async function (next) {
    if (this.isNew || this.isModified('password')) {
      const saltRounds = 10;
      this.password = await bcrypt.hash(this.password, saltRounds);
    }

    next();
  });

  userSchema.methods.correctPassword = async function (password) {
    return bcrypt.compare(password, this.password);
  };

  const User = model('User', userSchema);

  module.exports = User;
