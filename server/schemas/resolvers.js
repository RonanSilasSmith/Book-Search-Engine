const { AuthenticationError } = require('apollo-server-express');
const { User, Thought } = require('../models');
const { findOneAndUpdate } = require('../models/User');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        //I feel like it can't be this simple? I'll wait for everything to test well
        me: async (parent, args, context) => {
            if (context.user) {
                const userData = await User.findOne({ _id: context.user._id })
                    .select('-__v -password')
                return userData;
            }

            throw new AuthenticationError('Not logged in');
        },
    },
    Mutation: {
        //thank the heavens that this is so close to our material
        addUser: async (parent, args) => {
            const user = await User.create(args);
            const token = signToken(user);

            return { token, user };
        },
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });

            if (!user) {
                throw new AuthenticationError('Incorrect credentials');
            }

            const correctPw = await user.isCorrectPassword(password);

            if (!correctPw) {
                throw new AuthenticationError('Incorrect credentials');
            }

            const token = signToken(user);
            return { token, user };
        },
        saveBook: async (parent, args, context) => {
            //So this seems to be the way to do things, but I would like to return user and not book
            //I have the const defining the book and I fear that it would be redundant to have both that and the code required to return the new user
            //I should also keep in mind that this isn't C++ and I'm not gonna be whipped for having code that's slower by a fraction of a nanosecond
            //I may edit this later
            //on further thought, as long as the book object is doin it's thing I don't see why there's need to check if user is doing its thing
            if (context.user) {
                const book = await Book.create({ ...args});

                await User.findByIdAndUpdate(
                    { _id: context.user._id },
                    { $push: { savedBooks: book } },
                    { new: true }
                );

                return book;
            }

            throw new AuthenticationError('You need to be logged in!');
        },
        deleteBook: async (parent, args, context) =>{
            User.findOneAndUpdate(
                {_id: context.user_id},
                {$pull},
                {new: true}
            )
            //I feel like there's a lot missing here, including what exactly to include in the pull, I'm gonna workshop for a bit and revisit
        } 
    },
}

module.exports = resolvers