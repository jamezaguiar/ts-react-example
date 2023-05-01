import { ReactNode, useEffect, useMemo, useState } from 'react';
import './App.css';
import { getUsers } from './api/usersAPI';
import { Button } from './components/Button';
import { List } from './components/List';
import { Title } from './components/Title';
import { usePostsContext } from './context/postsContext/usePostsContext';
import { IUser } from './types/userTypes';
import { sortByKey } from './utils/arrayUtils';

function App() {
  const [users, setUsers] = useState<IUser[]>([]);
  const [isLoadingUsers, setIsLoadingUsers] = useState(false);

  const { getUserPosts, isLoadingPosts } = usePostsContext();

  useEffect(() => {
    setIsLoadingUsers(true);

    getUsers()
      .then(response => setUsers(response))
      .finally(() => setIsLoadingUsers(false));
  }, []);

  function handleDeleteUser(id: number) {
    setUsers(prevUsers => prevUsers.filter(user => user.id !== id));
  }

  const sortedItems = useMemo(() => {
    return sortByKey(users, 'name', 'DESC');
  }, [users]);

  return (
    <div className="App">
      <Title>Users</Title>
      {isLoadingUsers ? (
        <p>loading...</p>
      ) : (
        <List
          items={sortedItems}
          render={(user, index) => {
            let userName: ReactNode;
            if (index % 2 === 0) {
              userName = <p>{user.name}</p>;
            } else {
              userName = <h3>{user.name}</h3>;
            }

            return (
              <div
                key={user.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px',
                }}
              >
                {userName}{' '}
                {isLoadingPosts
                  ? 'loading posts...'
                  : `has ${getUserPosts(user.id).length} posts`}{' '}
                <Button
                  variant="danger"
                  onClick={() => handleDeleteUser(user.id)}
                >
                  Delete
                </Button>
              </div>
            );
          }}
        />
      )}
    </div>
  );
}

export default App;
