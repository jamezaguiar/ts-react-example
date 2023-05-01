import { useContext } from 'react';
import { PostsContext } from './PostsContext';

export function usePostsContext() {
  const context = useContext(PostsContext);

  if (!context) {
    throw new Error('PostsContext must be used withing a PostsProvider!');
  }

  return context;
}
