import React, { useState } from "react";
import {
  TextField,
  Button,
  Container,
  Box,
  Typography,
} from "@material-ui/core";
import axios from "axios";
import { useStyles } from "../Styles";
import { baseUrl } from "../config";

function LoginComponent() {
  const classes = useStyles();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      // 사용자가 입력한 사용자명(username)과 비밀번호(password)를 포함하여 POST 요청을 보냅니다.
      // 요청은 baseUrl에 정의된 경로와 함께 보내지며, JSON 형식의 데이터를 포함합니다.
      // 요청은 "Content-Type" 헤더가 "application/json"으로 설정되고, 인증 쿠키(withCredentials)를 포함합니다.
      const response = await axios.post(
        `${baseUrl}/user/login`,
        { username, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      // 응답 상태가 200인 경우, 로그인이 성공적으로 이루어졌음을 나타냅니다.
      // 성공 메시지를 출력하고, 홈 페이지로 이동합니다.
      if (response.status === 200) {
        console.log("로그인 성공");
        window.location.href = "/";
      }
    } catch (error) {
      // 오류가 발생한 경우, 오류를 콘솔에 출력하고 로그인 실패 메시지를 알립니다.
      console.log(error);
      alert("로그인에 실패하였습니다.");
    }
  };

  return (
    <Container maxWidth="800" className={classes.root}>
      {/* 로고 */}
      <Box className={classes.logoContainer}>
        <Typography variant="h2">로그인</Typography>
      </Box>

      {/* 사용자명 입력 필드 */}
      <TextField
        label="사용자명"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        fullWidth
        margin="normal"
        variant="outlined"
      />

      {/* 비밀번호 입력 필드 */}
      <TextField
        label="비밀번호"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        fullWidth
        margin="normal"
        variant="outlined"
      />

      {/* 로그인 버튼 */}
      <Box display="flex" justifyContent="flex-end" marginTop="16px">
        <Button variant="contained" color="default" onClick={handleLogin}>
          로그인
        </Button>
      </Box>
    </Container>
  );
}

export default LoginComponent;
