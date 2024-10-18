import React from 'react';
import { useQuery, useMutation, gql } from '@apollo/client';
import PromptItem from './PromptItem';

// Define the query to fetch all prompts
const GET_PROMPTS = gql`
  query GetPrompts {
    prompts {
      chatId
      prompt
      response
      chatTitle
      upVotes
      downVotes
      createdAt
    }
  }
`;

function PromptList() {
  const { loading, error, data } = useQuery(GET_PROMPTS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      {data.prompts.map((prompt) => (
        <PromptItem
          key={prompt.chatId}
          chatId={prompt.chatId}
          prompt={prompt.prompt}
          response={prompt.response}
          chatTitle={prompt.chatTitle}
          upVotes={prompt.upVotes}
          downVotes={prompt.downVotes}
        />
      ))}
    </div>
  );
}


export default PromptList;
