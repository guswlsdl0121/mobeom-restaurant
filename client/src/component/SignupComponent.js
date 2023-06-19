import React, { useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Container,
  Box,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import axios from "axios";
import { useStyles } from "../Styles";
import { baseUrl } from "../config";

function SignupComponent() {
  const classes = useStyles();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // 에러 상태 추가

  const handleSignup = async () => {
    try {
      const response = await axios.post(`${baseUrl}/user/signup`, {
        username,
        password,
      });
      console.log(response.data);
      window.history.back();
    } catch (error) {
      setError(error.response.data.error); // 서버에서 전송한 에러 메시지 설정
    }
  };

  return (
    <Container maxWidth="800" className={classes.root}>
      <Box className={classes.logoContainer}>
        <Typography variant="h2">회원가입</Typography>
      </Box>
      {error && ( // 에러 메시지 표시
        <Typography variant="body2" color="error" paragraph>
          {error}
        </Typography>
      )}
      <TextField
        label="Username"
        placeholder="아이디"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        fullWidth
        margin="normal"
        variant="outlined"
      />
      <TextField
        label="Password"
        placeholder="비밀번호"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        fullWidth
        margin="normal"
        variant="outlined"
      />
      <Box display="flex" justifyContent="flex-end" marginTop="16px">
        <Button
          variant="contained"
          color="default"
          onClick={handleSignup}
          className={classes.signupButton}
        >
          Signup
        </Button>
      </Box>
      <Box display="flex" justifyContent="flex-end" marginTop="16px">
        <Typography variant="body2" paragraph>
          계정이 이미 존재하십니까? <Link to="/login">Login</Link>
        </Typography>
      </Box>
    </Container>
  );
}

export default SignupComponent;
