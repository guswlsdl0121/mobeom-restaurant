import { useState, useEffect } from "react";
import axios from "axios";
import { baseUrl } from "../config";

// 로그인 상태를 확인하는 커스텀 훅
export const useLoginStatus = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // 로그인 상태를 확인하는 비동기 함수
    const checkLoginStatus = async () => {
      try {
        // 서버로 로그인 상태 확인 요청을 보냄
        const response = await axios.get(`${baseUrl}/checkLoginStatus`, {
          withCredentials: true, // 쿠키를 함께 전송하기 위해 withCredentials를 true로 설정
        });

        if (response.status === 200) {
          // 응답이 성공적으로 받아졌을 경우 isLoggedIn 상태를 true로 설정
          setIsLoggedIn(true);
        } else {
          // 응답이 성공적으로 받아지지 않은 경우 isLoggedIn 상태를 false로 설정
          setIsLoggedIn(false);
        }
      } catch (error) {
        // 요청이 실패한 경우 isLoggedIn 상태를 false로 설정
        setIsLoggedIn(false);
      }
    };

    // 컴포넌트가 마운트될 때 로그인 상태를 확인하는 함수 호출
    checkLoginStatus();
  }, []);

  return isLoggedIn; // 현재 로그인 상태 반환
};
