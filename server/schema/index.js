const { GraphQLObjectType, GraphQLSchema, GraphQLString, GraphQLInt, GraphQLList, GraphQLID } = require('graphql');
const Prompt = require('../models/Prompt');

// Define the PromptType
const PromptType = new GraphQLObjectType({
  name: 'Prompt',
  fields: () => ({
    chatId: { type: GraphQLID },
    prompt: { type: GraphQLString },
    response: { type: GraphQLString },
    chatTitle: { type: GraphQLString },
    upVotes: { type: GraphQLInt },
    downVotes: { type: GraphQLInt },
    createdAt: { type: GraphQLString }
  })
});

// Define the Root Query
const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    // Get a list of all prompts
    prompts: {
      type: new GraphQLList(PromptType),
      resolve: async () => await Prompt.find()
    },
    // Get a single prompt by chatId
    prompt: {
      type: PromptType,
      args: { chatId: { type: GraphQLID } },
      resolve: async (parent, args) => await Prompt.findOne({ chatId: args.chatId })
    }
  }
});

// Define Mutations
const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    // Add a new prompt
    addPrompt: {
      type: PromptType,
      args: {
        chatId: { type: GraphQLID },
        prompt: { type: GraphQLString },
        response: { type: GraphQLString },
        chatTitle: { type: GraphQLString }
      },
      resolve: async (parent, args) => {
        const newPrompt = new Prompt({
          chatId: args.chatId,
          prompt: args.prompt,
          response: args.response,
          chatTitle: args.chatTitle
        });
        return await newPrompt.save();
      }
    },
       // Delete a prompt by chatId
    deletePrompt: {
      type: PromptType, // You can return PromptType or a String message for confirmation
      args: {
        chatId: { type: GraphQLID }
      },
      resolve: async (parent, { chatId }) => {
        try {
          const deletedPrompt = await Prompt.findOneAndDelete({ chatId });

          if (!deletedPrompt) {
            throw new Error(`Prompt with chatId ${chatId} not found.`);
          }

          return deletedPrompt; // Or return a success message if you prefer
        } catch (error) {
          throw new Error(`Failed to delete the prompt: ${error.message}`);
        }
      }
}
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
});
