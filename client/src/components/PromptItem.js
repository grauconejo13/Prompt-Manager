import React from 'react';
import { useMutation, gql } from '@apollo/client';

// Define GraphQL mutations for upvoting, downvoting, and deleting
const UPVOTE_PROMPT = gql`
  mutation UpvotePrompt($chatId: ID!) {
    upvotePrompt(chatId: $chatId) {
      chatId
      upVotes
    }
  }
`;

const DOWNVOTE_PROMPT = gql`
  mutation DownvotePrompt($chatId: ID!) {
    downvotePrompt(chatId: $chatId) {
      chatId
      downVotes
    }
  }
`;

const DELETE_PROMPT = gql`
  mutation DeletePrompt($chatId: ID!) {
    deletePrompt(chatId: $chatId) {
      chatId
    }
  }
`;

function PromptItem({ chatId, prompt, response, chatTitle, upVotes, downVotes }) {
  const [upvotePrompt] = useMutation(UPVOTE_PROMPT, {
    variables: { chatId },
    refetchQueries: ['GetPrompts'], // Refetch the list after voting
    onError: (error) => {
      console.error('Error upvoting prompt:', error);
    }
  });

  const [downvotePrompt] = useMutation(DOWNVOTE_PROMPT, {
    variables: { chatId },
    refetchQueries: ['GetPrompts'], // Refetch the list after voting
    onError: (error) => {
      console.error('Error downvoting prompt:', error);
    }
  });

  const [deletePrompt] = useMutation(DELETE_PROMPT, {
    variables: { chatId },
    refetchQueries: ['GetPrompts'], // Refetch the list after deletion
    onError: (error) => {
      console.error('Error deleting prompt:', error);
    }
  });

  const handleUpvote = () => {
    upvotePrompt();
  };

  const handleDownvote = () => {
    downvotePrompt();
  };

  const handleDelete = () => {
    deletePrompt();
  };

  return (
    <div className="prompt-item">
      <h3>{chatTitle}</h3>
      <p><strong>Prompt:</strong> {prompt}</p>
      <p><strong>Response:</strong> {response}</p>
      <div className="button-group">
        <button onClick={handleUpvote} className="vote-button">
          👍 {upVotes}
        </button>
        <button onClick={handleDownvote} className="vote-button">
          👎 {downVotes}
        </button>
        <button onClick={handleDelete} className="delete-button">
          🗑️
        </button>
      </div>
    </div>
  );
}

export default PromptItem;
