import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Button,
} from "@mui/material";

const LoginAlert = ({ open, onClose }) => {
  const navigate = useNavigate();
  const handleClose = () => {
    onClose();
  };

  const handleLogin = () => {
    navigate("/login");
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>로그인 필요</DialogTitle>
      <DialogContent>
        <Typography variant="body1">
          로그인이 필요한 기능입니다. 로그인 하시겠습니까?
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          취소
        </Button>
        <Button onClick={handleLogin} color="primary" autoFocus>
          로그인
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default LoginAlert;
