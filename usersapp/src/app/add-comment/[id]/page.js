"use client";

import { useState, useEffect   } from "react";
import { useRouter, useParams } from "next/navigation";
import { TextField, Button, Box, Typography, Container, Alert } from "@mui/material";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";

export default function AddComment() {
  const [post, setPost] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [comment, setComment] = useState("");
  const [errors, setErrors] = useState({ name: false, email: false, comment: false });

  const { id } = useParams();
  const router = useRouter();
  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
      .then((res) => res.json())
      .then((data) => setPost(data));
  }, [id]);

  const handleAddComment = () => {
    let newErrors = { name: false, email: false, comment: false };

    if (!name.trim()) newErrors.name = true;
    if (!email.trim()) newErrors.email = true;
    if (!comment.trim()) newErrors.comment = true;

    setErrors(newErrors);

    if (Object.values(newErrors).some((error) => error)) return; // Stop if there are errors

    const newCommentObj = { id: `local-${Date.now()}`, name, email, body: comment };

    const storedComments = JSON.parse(localStorage.getItem(`userComments-${id}`)) || [];
    const updatedComments = [...storedComments, newCommentObj];

    localStorage.setItem(`userComments-${id}`, JSON.stringify(updatedComments));

    setName("");
    setEmail("");
    setComment("");
    router.push(`/comments/${id}`); // Redirect to comments page after adding
  };

  return (
    <Container>
      <Button onClick={() => router.back()} sx={{ marginBottom: 2 }} startIcon={<ArrowBackOutlinedIcon />}>
        Back
      </Button>
      <Typography variant="h5" sx={{ marginBottom: 2 }}>
        Add Comment for Post {id}
      </Typography>

      {post && (
        <Box sx={{ marginBottom: 3, padding: 2, backgroundColor: "#f5f5f5", borderRadius: 2 }}>
          <Typography variant="h6">{post.title}</Typography>
          <Typography variant="body1">{post.body}</Typography>
        </Box>
      )}

      <TextField
        label="Name"
        variant="outlined"
        fullWidth
        size="small"
        value={name}
        error={errors.name}
        helperText={errors.name ? "Name is required" : ""}
        sx={{ marginBottom: 2 }}
        onChange={(e) => setName(e.target.value)}
      />
      
      <TextField
        label="Email"
        variant="outlined"
        fullWidth
        size="small"
        value={email}
        error={errors.email}
        helperText={errors.email ? "Email is required" : ""}
        sx={{ marginBottom: 2 }}
        onChange={(e) => setEmail(e.target.value)}
      />

      <TextField
        label="Comment"
        variant="outlined"
        multiline
        rows={3}
        fullWidth
        value={comment}
        error={errors.comment}
        helperText={errors.comment ? "Comment cannot be empty" : ""}
        sx={{ marginBottom: 2 }}
        onChange={(e) => setComment(e.target.value)}
      />

      <Box sx={{ display: "flex", gap: 2 }}>
        <Button variant="contained" color="primary" onClick={handleAddComment}>
          Submit Comment
        </Button>
        <Button variant="outlined" onClick={() => router.back()}>
          Cancel
        </Button>
      </Box>
    </Container>
  );
}
