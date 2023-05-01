import { ReactNode, useEffect, useState } from 'react';
import './App.css';
import { getUsers } from './api/usersAPI';
import { Button } from './components/Button';
import { List } from './components/List';
import { Title } from './components/Title';
import { IUser } from './types/userTypes';
import { sortByKey } from './utils/arrayUtils';

function App() {
  const [users, setUsers] = useState<IUser[]>([]);
  const [isLoadingUsers, setIsLoadingUsers] = useState(false);

  useEffect(() => {
    setIsLoadingUsers(true);

    getUsers()
      .then(response => setUsers(response))
      .finally(() => setIsLoadingUsers(false));
  }, []);

  function handleDeleteUser(id: number) {
    setUsers(prevUsers => prevUsers.filter(u => u.id !== id));
  }

  return (
    <div className="App">
      <Title>Users</Title>
      {isLoadingUsers ? (
        <p>loading...</p>
      ) : (
        <List
          items={sortByKey(users, 'name', 'DESC')}
          render={(user, index) => {
            let userName: ReactNode;
            if (index % 2 === 0) {
              userName = <p key={user.id}>{user.name}</p>;
            } else {
              userName = <h3 key={user.id}>{user.name}</h3>;
            }

            return (
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px',
                }}
              >
                {userName}{' '}
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
