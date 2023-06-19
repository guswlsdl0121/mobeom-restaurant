import React, { useState } from "react";
import axios from "axios";
import { AppBar, Toolbar, Typography, IconButton } from "@material-ui/core";
import { PersonAdd, LockOpen, ExitToApp } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useStyles } from "../Styles";
import { baseUrl } from "../config";
import { useLoginStatus } from "./useLoginStatus";

function AppBarComponent() {
  const classes = useStyles();
  const isLoggedIn = useLoginStatus();
  const [isTitleHovered, setIsTitleHovered] = useState(false);

  // 로그아웃 처리
  const handleLogout = async () => {
    try {
      await axios.post(`${baseUrl}/user/logout`, {}, { withCredentials: true });
      window.location.reload(); // 페이지 새로고침
    } catch (error) {
      console.error("로그아웃 오류: ", error);
    }
  };

  // 타이틀 클릭 처리
  const handleTitleClick = () => {
    window.location.href = "/";
  };

  // 타이틀에 마우스 진입 처리
  const handleTitleMouseEnter = () => {
    setIsTitleHovered(true);
  };

  // 타이틀에서 마우스 벗어남 처리
  const handleTitleMouseLeave = () => {
    setIsTitleHovered(false);
  };

  // 타이틀 스타일
  const titleStyle = isTitleHovered ? { cursor: "pointer" } : {};
  const titleClassName = isTitleHovered
    ? `${classes.title} ${classes.clickableTitle}`
    : classes.title;

  return (
    <div>
      {/* 앱 바 컴포넌트 */}
      <AppBar position="static" className={classes.appBar}>
        <Toolbar>
          {/* 타이틀 */}
          <Typography
            variant="h6"
            className={titleClassName}
            onClick={handleTitleClick}
            onMouseEnter={handleTitleMouseEnter}
            onMouseLeave={handleTitleMouseLeave}
            style={titleStyle}
          >
            경상북도 모범 음식점
          </Typography>

          {/* 로그인 상태에 따른 아이콘 */}
          <div>
            {isLoggedIn ? (
              // 로그인 상태인 경우 로그아웃 아이콘
              <IconButton color="inherit" onClick={handleLogout}>
                <ExitToApp />
              </IconButton>
            ) : (
              // 로그인 상태가 아닌 경우 회원가입, 로그인 아이콘
              <>
                <IconButton color="inherit" component={Link} to="/signup">
                  <PersonAdd />
                </IconButton>
                <IconButton color="inherit" component={Link} to="/login">
                  <LockOpen />
                </IconButton>
              </>
            )}
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default AppBarComponent;
