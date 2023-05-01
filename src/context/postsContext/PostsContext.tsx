import {
  ReactNode,
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { getPosts } from '../../api/postsAPI';
import { IPost } from '../../types/postTypes';

type PostsContextType = {
  posts: IPost[];
  isLoadingPosts: boolean;
  getUserPosts: (userId: number) => IPost[];
  deletePost(postId: number): void;
};

type PostsProviderProps = {
  children: ReactNode;
};

export const PostsContext = createContext<PostsContextType | null>(null);

function PostsProvider({ children }: PostsProviderProps) {
  const [isLoadingPosts, setIsLoadingPosts] = useState(false);
  const [posts, setPosts] = useState<IPost[]>([]);

  useEffect(() => {
    setIsLoadingPosts(true);

    getPosts()
      .then(response => setPosts(response))
      .finally(() => setIsLoadingPosts(false));
  }, []);

  const getUserPosts = useCallback(
    (userId: number) => {
      return posts.filter(post => post.userId === userId);
    },
    [posts]
  );

  function deletePost(postId: number) {
    setPosts(prevPosts => prevPosts.filter(post => post.id !== postId));
  }

  const value = useMemo(
    () => ({
      posts,
      isLoadingPosts,
      getUserPosts,
      deletePost,
    }),
    [getUserPosts, posts, isLoadingPosts]
  );

  return (
    <PostsContext.Provider value={value}>{children}</PostsContext.Provider>
  );
}

export default PostsProvider;
