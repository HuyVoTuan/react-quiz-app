import { useSelector } from 'react-redux';

const UserInfo = () => {
  const { users } = useSelector((state) => state.dashboard);
  const userId = window.localStorage.getItem('user_id');

  const user = users.find((user) => user.id === JSON.parse(userId));

  return (
    <div className="mb-4">
      <h3 className="text-2xl">User Info</h3>
      <p className="text-lg">
        <strong>User ID:</strong> {user.id}
      </p>
      <p className="text-lg">
        <strong>Username:</strong> {user.username}
      </p>
    </div>
  );
};

export default UserInfo;
