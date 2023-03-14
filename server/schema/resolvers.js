const { User, Post, Comment } = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');

const axios = require('axios');
const key = "MzIyNzAwMjF8MTY3ODMzMzk3OS40OTEwMDMz";
const pword = "54e3e807cb4e9acb864b73d3d0f3b8e5a0d5bc98f4d8243fcfaba7b69cf20d6c";

const resolvers = {
  Query: {
    getMe: async (_parent, _args, context) => {
      return await User.findOne({ _id: context.user._id })
    },
    getUsers: async () => {
      return await User.find();
    },
    getPosts: async (_parent, args, context) => {
      return await Post.find()
      .populate('author')
    },
    seatGeekSearch: async () => {
      const { data }  = await 
      axios.get('https://api.seatgeek.com/2/events?lat=35.5914&lon=-82.551', {
        mode: 'no-cors',
        auth: {
          "username": key,
          "password": pword
        }
      })
      return data.events;
    },
    holidays: async (_parent, _args) => {
      const { data } = await
      axios.get('https://calendarific.com/api/v2/holidays?&api_key=06e5923a912a99b087d110c3e1dd9326415107b9&country=US&year=2023&month=3', {
        mode: 'no-cors'
      })
      return data.response.holidays;
    },
    breweries: async (_parent, _args) => {
      const randIndex = Math.floor(Math.random()*6)
      const { data } = await 
      axios.get(`https://api.openbrewerydb.org/breweries?by_city=asheville&page=${randIndex}&per_page=5`, {
        mode: 'no-cors'
      });
      return data;
    },
    gaming: async (_parent, _args) => {
      const { data } = await
      axios.get('https://www.freetogame.com/api/games', {
        mode: 'no-cors'
      });
      let games = []
      for (let i=0; i < 11; i++){
        let game = data[Math.floor(Math.random()*data.length)]
        games.push(game)
      }
      return games;
    },
    parks: async (_parent, _args) => {
      const { data } = await
      axios.get('https://developer.nps.gov/api/v1/thingstodo?stateCode=NC&limit=20&q=hiking%2C%20camping&fields=entranceFees&api_key=j8tYaJwYWMh7IHgL0SgKi6QoHEyYzKMPSfcQSdtw', {
        mode: 'no-cors'
      });
      return data.data;
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

      if (context.user) {
        const post = await Post.create({
          text: args.text, author: context.user._id
        })
        await User.findByIdAndUpdate(context.user._id,
          { $push: { posts: post }}
          )
        return post.populate('author')
      } else {
        throw new AuthenticationError('You must be logged in to Post!')
      }
    }
  }
};

module.exports = resolvers;