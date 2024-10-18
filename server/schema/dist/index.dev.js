"use strict";

var _require = require('graphql'),
    GraphQLObjectType = _require.GraphQLObjectType,
    GraphQLSchema = _require.GraphQLSchema,
    GraphQLString = _require.GraphQLString,
    GraphQLInt = _require.GraphQLInt,
    GraphQLList = _require.GraphQLList,
    GraphQLNonNull = _require.GraphQLNonNull;

var Prompt = require('../models/Prompt');

var PromptType = new GraphQLObjectType({
  name: 'Prompt',
  fields: function fields() {
    return {
      chatId: {
        type: GraphQLString
      },
      prompt: {
        type: GraphQLString
      },
      response: {
        type: GraphQLString
      },
      createdAt: {
        type: GraphQLString
      },
      chatTitle: {
        type: GraphQLString
      },
      upVotes: {
        type: GraphQLInt
      },
      downVotes: {
        type: GraphQLInt
      }
    };
  }
});
var RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    prompts: {
      type: new GraphQLList(PromptType),
      resolve: function resolve(parent, args) {
        return Prompt.find();
      }
    },
    prompt: {
      type: PromptType,
      args: {
        chatId: {
          type: GraphQLString
        }
      },
      resolve: function resolve(parent, args) {
        return Prompt.findOne({
          chatId: args.chatId
        });
      }
    }
  }
});
var Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addPrompt: {
      type: PromptType,
      args: {
        chatId: {
          type: new GraphQLNonNull(GraphQLString)
        },
        prompt: {
          type: new GraphQLNonNull(GraphQLString)
        },
        response: {
          type: new GraphQLNonNull(GraphQLString)
        },
        chatTitle: {
          type: new GraphQLNonNull(GraphQLString)
        }
      },
      resolve: function resolve(parent, args) {
        var newPrompt = new Prompt({
          chatId: args.chatId,
          prompt: args.prompt,
          response: args.response,
          chatTitle: args.chatTitle
        });
        return newPrompt.save();
      }
    },
    deletePrompt: {
      type: PromptType,
      args: {
        chatId: {
          type: new GraphQLNonNull(GraphQLString)
        }
      },
      resolve: function resolve(parent, args) {
        return Prompt.findOneAndDelete({
          chatId: args.chatId
        });
      }
    }
  }
});
module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
});
//# sourceMappingURL=index.dev.js.map
