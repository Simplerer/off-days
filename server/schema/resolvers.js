const { User, Post, Comment } = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    getMe: async (_parent, _args, context) => {
      return await User.findOne({ _id: context.user._id })
    },
    getUsers: async () => {
      return await User.find();
    },
    getPosts: async (_parent, args, context) => {
      return await Post.find(
      //   {
      //   $or: [
      //     {author: context.user.username},
      //     {author: args.username}
      //   ]
      // }
      )
    }
  },

  Mutation: {
    createUser: async (_parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);
      return { token, user }
    },
    login: async (_parent, { username, password }) => {
      const user = await User.findOne({username});
      const correctPass = await user.correctPassword(password);

      if (!correctPass) {
        throw new AuthenticationError('Password is Incorrect!');
      }
      if (!user) {
        throw new AuthenticationError('Username does not match records');
      }

      const token = signToken(user);
      return { user, token };
    },
    addPost: async (_parent, args, context) => {
      console.log(args)
      console.log(context)

      if (context.user) {
        const post = await Post.create({
          text: args.text, userId: context.user._id
        })
        return post.populate('author')
      } else {
        throw new AuthenticationError('You must be logged in to Post!')
      }
    }
  }
};

module.exports = resolvers;