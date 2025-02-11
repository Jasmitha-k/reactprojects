
import Link from 'next/link';
import axios from 'axios';

export default async function Home() {
  // Fetch users from JSONPlaceholder
  const res = await axios.get('https://jsonplaceholder.typicode.com/users');
  const users = res.data.slice(0, 5); 

  return (
    <div style={{ padding: '20px' }}>
      <h1>Users</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            <Link href={`/users/${user.id}`}>{user.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}