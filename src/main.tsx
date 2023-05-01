import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import PostsProvider from './context/postsContext/PostsContext.tsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <PostsProvider>
      <App />
    </PostsProvider>
  </React.StrictMode>
);
