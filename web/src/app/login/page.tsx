import { Container, CssBaseline, Paper } from "@mui/material";
import LoginForm from "src/components/login-form/login-form";

const Login = () => {
  return (
    <Container
      component="main"
      maxWidth="xs"
      sx={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
      }}
    >
      <CssBaseline />
      <Paper
        elevation={3}
        sx={{
          padding: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <LoginForm />
      </Paper>
    </Container>
  );
};

export default Login;
