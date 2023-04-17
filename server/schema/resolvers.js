const { User, Post, Comment } = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');
require('dotenv').config();

const axios = require('axios');

const resolvers = {
  Query: {
    getMe: async (_parent, _args, context) => {
      return await User.findOne({ _id: context.user._id })
    },
    getUsers: async () => {
      return await User.find();
    },
    getPosts: async () => {
      return await Post.find()
        .sort({ createdAt: -1 })
        .populate('author')
    },
    getLatLon: async (_parent, args) => {
      const { data } = await
        axios.get(`https://api.openweathermap.org/geo/1.0/direct?q=${args.homeTown}&limit=1&appid=226011e8e963e4a2251a03649b5adc44`, {
          mode: 'no-cors'
        })
      return data[0];

    },
    seatGeekSearch: async (_parent, args) => {
      if (args.lat) {
        const { data } = await
          axios.get(`https://api.seatgeek.com/2/events?lat=${args.lat}&lon=${args.lon}`, {
            mode: 'no-cors',
            auth: {
              "username": process.env.API_KEY,
              "password": process.env.API_PWORD
            }
          })
        return data.events;
      } else {
        const { data } = await
          axios.get('https://api.seatgeek.com/2/events?lat=35.5914&lon=-82.551', {
            mode: 'no-cors',
            auth: {
              "username": process.env.API_KEY,
              "password": process.env.API_PWORD
            }
          })
        return data.events;
      }
    },
    holidays: async (_parent, _args) => {
      const { data } = await
        axios.get('https://calendarific.com/api/v2/holidays?&api_key=06e5923a912a99b087d110c3e1dd9326415107b9&country=US&year=2023&month=3', {
          mode: 'no-cors'
        })
      return data.response.holidays;
    },
    breweries: async (_parent, args) => {
      const randIndex = Math.floor(Math.random() * 3)
      let beers
      if (args.homeTown) {
        const { data } = await
          axios.get(`https://api.openbrewerydb.org/breweries?by_city=${args.homeTown}&page=${randIndex}&per_page=12`, {
            mode: 'no-cors'
          });
        beers = data
      }
      if (beers.length == 0) {
        const { data } = await
          axios.get(`https://api.openbrewerydb.org/breweries?by_city=Asheville&page=${randIndex}&per_page=8`, {
            mode: 'no-cors'
          });
        return data;
      }
      return beers
    },
    gaming: async (_parent, _args) => {
      const { data } = await
        axios.get('https://www.freetogame.com/api/games', {
          mode: 'no-cors'
        });
      let games = []
      for (let i = 0; i < 11; i++) {
        let game = data[Math.floor(Math.random() * data.length)]
        games.push(game)
      }
      return games;
    },
    parks: async (_parent, args) => {
      if (args.state) {
        const { data } = await
          axios.get(`https://developer.nps.gov/api/v1/thingstodo?stateCode=${args.state}&limit=20&q=hiking%2C%20camping&fields=entranceFees&api_key=j8tYaJwYWMh7IHgL0SgKi6QoHEyYzKMPSfcQSdtw`, {
            mode: 'no-cors'
          });
        return data.data;
      } else {
        const { data } = await
          axios.get('https://developer.nps.gov/api/v1/thingstodo?stateCode=NC&limit=20&q=hiking%2C%20camping&fields=entranceFees&api_key=j8tYaJwYWMh7IHgL0SgKi6QoHEyYzKMPSfcQSdtw', {
            mode: 'no-cors'
          });
        return data.data;
      }
    }
  },

  Mutation: {
    createUser: async (_parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);
      return { token, user }
    },
    login: async (_parent, args) => {
      const user = await User.findOne({ username: args.username });
      const correctPass = await user.correctPassword(args.password);

      if (!correctPass) {
        throw new AuthenticationError('Password is Incorrect!');
      }
      if (!user) {
        throw new AuthenticationError('Username does not match records');
      }

      const token = signToken(user);
      return { token, user };
    },
    addPost: async (_parent, args, context) => {
      if (context.user) {
        const post = await Post.create({
          text: args.text, author: context.user._id
        })
        await User.findByIdAndUpdate(context.user._id,
          { $push: { posts: post } }
        )
        return post.populate('author')
      } else {
        throw new AuthenticationError('You must be logged in to Post!')
      }
    },
    createLike: async (_parent, args, context) => {
      console.log('Args', args)
      if (context.user) {
        return User.findOneAndUpdate(
          { _id: context.user._id },
          {
            $addToSet: {
              likes:
              {
                event: args.event,
                link: args.link,
                type: args.type
              }
            },
          },
          {
            new: true,
            runValidators: true,
          }
        )
      } else {
        throw new AuthenticationError('Problem!!')
      }
    }
  }
};

module.exports = resolvers;