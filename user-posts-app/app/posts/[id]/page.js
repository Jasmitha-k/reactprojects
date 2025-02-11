//comments for a post
"use client"; 

import axios from "axios";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";

export default function PostComments() {
  const params = useParams();
  const { id } = params; 
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  useEffect(() => {
    const fetchComments = async () => {
      const res = await axios.get(
        `https://jsonplaceholder.typicode.com/comments?postId=${id}`
      );
      setComments(res.data);
    };
    fetchComments();
  }, [id]);

  const handleAddComment = async () => {
    if (!newComment.trim()) return;
    const fakeComment = {
      postId: parseInt(id),
      id: comments.length + 1, 
      name: "Anonymous",
      email: "anonymous@example.com",
      body: newComment,
    };

    setComments([...comments, fakeComment]);
    setNewComment("");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1 style={{color:'red'}}>Comments for Post {id}</h1>
      <ul>
        {comments.map((comment) => (
          <li key={comment.id}>
            <h4>{comment.id}. {comment.name}</h4>
            <p>{comment.body}</p>
          </li>
        ))}
      </ul>

      <div>
        <h3 style={{color:'red'}}>Add a Comment</h3>
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Write your comment here..."
          rows={4}
          style={{ width: "100%" }}
        />
        <button
          onClick={handleAddComment}
          style={{
            backgroundColor: "blue",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}>
        Submit Comment
        </button>
      </div>
    </div>
  );
}
