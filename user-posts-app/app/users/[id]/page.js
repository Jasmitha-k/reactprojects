//posts done by user
import axios from "axios";
import Link from "next/link";

export default async function UserPosts({ params }) {
  const { id } = params; // Get the user ID from the URL

  // Fetch posts for the specific user
  const res = await axios.get(
    `https://jsonplaceholder.typicode.com/posts?userId=${id}`
  );
  const posts = res.data;

  return (
    <div>
      <h1 style={{textAlign:'center'}}>Posts by User {id}</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <h3 style={{padding:'20px',textAlign:'center'}}>post's caption : {post.title}</h3>
          
            <p style={{padding:'20px'}}>post: {post.body}</p>
            <Link href={`/posts/${post.id}`} >
              <button
                style={{
                  justifyContent:'center',
                  backgroundColor: "blue",
                  color: "white",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                  
                }}
              >
                View Comments
              </button>
            </Link>
            
            </li>
          
        ))}
      </ul>
    </div>
  );
}
