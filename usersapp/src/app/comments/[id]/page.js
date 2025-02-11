"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Stack,
  Pagination,
  CircularProgress,
  Container,
} from "@mui/material";
import AddCommentOutlinedIcon from "@mui/icons-material/AddCommentOutlined";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";

export default function PostComments() {
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const { id } = useParams();
  const router = useRouter();
  const commentsPerPage = 4;

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      const storedComments =
        JSON.parse(localStorage.getItem(`userComments-${id}`)) || [];

      try {
        const postResponse = await fetch(
          `https://jsonplaceholder.typicode.com/posts/${id}`
        );
        const postData = await postResponse.json();
        setPost(postData);

        const commentsResponse = await fetch(
          `https://jsonplaceholder.typicode.com/posts/${id}/comments`
        );
        const apiComments = await commentsResponse.json();

        // Ensure no duplicate comments by filtering out local comments that already exist
        const uniqueLocalComments = storedComments.filter(
          (local) =>
            !apiComments.some(
              (api) => api.body === local.body && api.email === local.email
            )
        );

        setComments([...apiComments, ...uniqueLocalComments]); // Merge only unique comments
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const totalPages = Math.ceil(comments.length / commentsPerPage);
  const indexOfLastComment = currentPage * commentsPerPage;
  const indexOfFirstComment = indexOfLastComment - commentsPerPage;
  const currentComments = comments.slice(
    indexOfFirstComment,
    indexOfLastComment
  );

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  return (
    <Container sx={{ padding: "20px" }}>
      <Button
        onClick={() => router.back()}
        sx={{ marginBottom: 2 }}
        startIcon={<ArrowBackOutlinedIcon />}
      >
        Back
      </Button>

      <Typography variant="h5" sx={{ marginBottom: 2 }}>
        Comments for post {id}
      </Typography>
      {loading ? (
        <Stack alignItems="center" sx={{ marginTop: 4 }}>
          <CircularProgress />
        </Stack>
      ) : (
        <>
          {currentComments.map((comment) => (
            <Card key={comment.id} sx={{ marginBottom: 2, padding: 2 }}>
              <CardContent>
                <Typography variant="subtitle1">{comment.name}</Typography>
                <Typography variant="body2">{comment.body}</Typography>
                <Typography variant="caption" color="textSecondary">
                  - {comment.email}
                </Typography>
              </CardContent>
            </Card>
          ))}
          {currentPage === totalPages && totalPages > 0 &&
          <Button
        variant="contained"
        sx={{ marginBottom: 2}}
        onClick={() => router.push(`/add-comment/${post?.id}`)}
        disabled={!post}
        startIcon={<AddCommentOutlinedIcon/>}
      >
        Add Comment
      </Button>
}

          {totalPages > 1 && (
            <Stack spacing={2} alignItems="center" sx={{ marginTop: 2 }}>
              <Pagination
                count={totalPages}
                page={currentPage}
                onChange={handlePageChange}
                shape="rounded"
                variant="outlined"
                color="secondary"
              />
            </Stack>
          )}
        </>
      )}
    </Container>
  );
}
