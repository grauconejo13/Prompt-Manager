import React, { useState } from 'react';
import { useMutation, gql } from '@apollo/client';

// Define the GraphQL mutation
const ADD_PROMPT = gql`
  mutation AddPrompt($chatId: ID!, $prompt: String!, $response: String!, $chatTitle: String!) {
    addPrompt(chatId: $chatId, prompt: $prompt, response: $response, chatTitle: $chatTitle) {
      chatId
      prompt
      response
      chatTitle
      createdAt
    }
  }
`;

function PromptForm() {
  const [formState, setFormState] = useState({
    chatId: '',
    prompt: '',
    response: '',
    chatTitle: ''
  });

  const [addPrompt, { error }] = useMutation(ADD_PROMPT);

  const handleSubmit = async (event) => {
  event.preventDefault();
  try {
    console.log('Submitting:', formState); // Log the form data being sent
    await addPrompt({
      variables: {
        chatId: formState.chatId,
        prompt: formState.prompt,
        response: formState.response,
        chatTitle: formState.chatTitle
      }
    });
    setFormState({
      chatId: '',
      prompt: '',
      response: '',
      chatTitle: ''
    });
  } catch (err) {
    console.error('Error adding prompt:', err);
  }
};


  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="chatId">Chat ID</label>
        <input
          type="text"
          id="chatId"
          value={formState.chatId}
          onChange={(e) => setFormState({ ...formState, chatId: e.target.value })}
          required
        />
      </div>
      <div>
        <label htmlFor="prompt">Prompt</label>
        <input
          type="text"
          id="prompt"
          value={formState.prompt}
          onChange={(e) => setFormState({ ...formState, prompt: e.target.value })}
          required
        />
      </div>
      <div>
        <label htmlFor="response">Response</label>
        <input
          type="text"
          id="response"
          value={formState.response}
          onChange={(e) => setFormState({ ...formState, response: e.target.value })}
          required
        />
      </div>
      <div>
        <label htmlFor="chatTitle">Chat Title</label>
        <input
          type="text"
          id="chatTitle"
          value={formState.chatTitle}
          onChange={(e) => setFormState({ ...formState, chatTitle: e.target.value })}
          required
        />
      </div>
      <button type="submit">Add Prompt</button>
      {error && <p style={{ color: 'red' }}>Error: {error.message}</p>}
    </form>
  );
}

export default PromptForm;
