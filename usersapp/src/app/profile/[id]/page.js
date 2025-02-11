"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import CommentOutlinedIcon from '@mui/icons-material/CommentOutlined';
import AddCommentOutlinedIcon from "@mui/icons-material/AddCommentOutlined";
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined';
import {
  Card,
  CardContent,
  Typography,
  Button,
  Stack,
  Pagination,
  Container,
  CircularProgress,
  IconButton,
} from "@mui/material";

export default function UserPosts() {
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 4;

  const { id } = useParams();
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const userResponse = await fetch(
          `https://jsonplaceholder.typicode.com/users/${id}`
        );
        const userData = await userResponse.json();
        setUser(userData);

        const postsResponse = await fetch(
          `https://jsonplaceholder.typicode.com/users/${id}/posts`
        );
        const postsData = await postsResponse.json();
        setPosts(postsData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const totalPages = Math.ceil(posts.length / postsPerPage);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  return (
    <Container sx={{ padding: "20px" }}>
      <Button onClick={() => router.push(`/`)} sx={{ marginBottom: 2 }} startIcon={<ArrowBackOutlinedIcon />}>
        Back to Profile
      </Button>
      <Typography variant="h4" sx={{ marginBottom: 2 }}>
        Posts of {user ? user.name : "User"}
      </Typography>

      {loading ? (
        <Stack alignItems="center" sx={{ marginTop: 4 }}>
          <CircularProgress />
        </Stack>
      ) : (
        <>
          {currentPosts.map((post) => (
            <Card key={post.id} sx={{ marginBottom: 2, padding: 2 }}>
              <CardContent>
                <Typography variant="h6">{post.title}</Typography>
                <Typography variant="body2">{post.body}</Typography>
                <Button
                  variant="contained"
                  sx={{ marginTop: 2, marginRight: 5, color: "secondary" }}
                  startIcon={<CommentOutlinedIcon />}
                  onClick={() => router.push(`/comments/${post.id}`)}
                >
                  View Comments
                </Button>
                <Button
                  variant="contained"
                  sx={{ marginTop: 2, marginRight: 5 }}
                  startIcon={<AddCommentOutlinedIcon />}
                  onClick={() => router.push(`/add-comment/${post?.id}`)}
                  disabled={!post}
                >
                  Add Comment
                </Button>
              </CardContent>
            </Card>
          ))}

          {totalPages > 1 && (
            <Stack spacing={2} alignItems="center" sx={{ marginTop: 2 }}>
              <Pagination
                count={totalPages}
                page={currentPage}
                onChange={handlePageChange}
                shape="rounded"
                variant="outlined"
              />
            </Stack>
          )}
        </>
      )}
    </Container>
  );
}
