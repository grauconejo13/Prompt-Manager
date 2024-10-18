import React from 'react';
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PromptForm from './components/PromptForm';
import PromptList from './components/PromptList';
import Header from './components/Header';
import Footer from './components/Footer';

const client = new ApolloClient({
    uri: 'http://localhost:5000/graphql',
    cache: new InMemoryCache()
});

function App() {
    return (
        <ApolloProvider client={client}>
            <Router>
                <Header />
                <div className="container">
                    <Routes>
                        <Route path="/" element={<h2>Welcome to AI Prompt Manager</h2>} />
                        <Route path="/create" element={<PromptForm />} />
                        <Route path="/list" element={<PromptList />} />
                    </Routes>
                </div>
                <Footer />
            </Router>
        </ApolloProvider>
    );
}

export default App;
