"use client";
import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Grid,
  Container,
  CircularProgress,
} from "@mui/material";
import { useRouter } from "next/navigation";
// import { useRouter } from "next/router";
export default function Users() {
  const [users, setUsers] = useState([]);
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading("true");
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((data) => setUsers(data));
    setLoading(false);
  }, []);

  return (
    <Container>
      <Typography variant="h4" align="center" gutterBottom>
        Users Profile
      </Typography>
      {loading ? (
        <div
          style={{ display: "flex", justifyContent: "center", marginTop: 20 }}
        >
          <CircularProgress />
        </div>
      ) : (
        <Grid container spacing={3}>
          {users.map((user) => (
            <Grid item xs={12} sm={6} md={4} key={user.id}>
              <Card sx={{ padding: 2, textAlign: "center" }}>
                <CardContent>
                  <Typography variant="h6">{user.name}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {user.email}
                  </Typography>
                  <Typography variant="body1">Phone: {user.phone}</Typography>
                  <Typography variant="body1">
                    Website: {user.website}
                  </Typography>
                  <Typography variant="body1">
                    Company: {user.company.name}
                  </Typography>
                  <Button
                    variant="contained"
                    sx={{ marginTop: 2 }}
                    onClick={() => router.push(`/profile/${user.id}`)}
                  >
                    View posts
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
}
