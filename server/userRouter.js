import express from "express";
import bcrypt from "bcrypt";

const userRouter = (db) => {
  const router = express.Router();

  // 회원 가입
  router.post("/signup", (req, res) => {
    const { username, password } = req.body;

    // 이미 존재하는 username인지 확인
    db.query(
      "SELECT * FROM Users WHERE username = ?",
      [username],
      (error, results) => {
        if (error) {
          console.error("Error checking username: ", error);
          res.status(500).json({ error: "Internal server error" });
          return;
        }

        if (results.length > 0) {
          // 이미 존재하는 username인 경우
          res.status(400).json({ error: "이미 존재하는 회원입니다!" });
          return;
        }

        // 비밀번호 해싱
        bcrypt.hash(password, 10, (err, hashedPassword) => {
          if (err) {
            console.error("Error hashing password: ", err);
            res.status(500).json({ error: "Internal server error" });
            return;
          }

          // 사용자 정보 삽입
          db.query(
            "INSERT INTO Users (username, password) VALUES (?, ?)",
            [username, hashedPassword],
            (insertError) => {
              if (insertError) {
                console.error("Error creating user: ", insertError);
                res.status(500).json({ error: "Internal server error" });
                return;
              }

              res.json({ message: "User created successfully" });
            }
          );
        });
      }
    );
  });

  // 로그인
  router.post("/login", (req, res) => {
    const { username, password } = req.body;
    const sql = "SELECT * FROM Users WHERE username = ?";

    db.query(sql, [username], (error, results) => {
      if (error) {
        console.error("사용자 조회 오류: ", error);
        res.status(500).json({ error: "내부 서버 오류" });
        return;
      }

      if (results.length === 0) {
        // 사용자가 존재하지 않는 경우
        res.status(401).json({ error: "잘못된 사용자명" });
        return;
      }

      const user = results[0];

      bcrypt.compare(password, user.password, (bcryptError, isMatch) => {
        if (bcryptError) {
          console.error("비밀번호 비교 오류: ", bcryptError);
          res.status(500).json({ error: "내부 서버 오류" });
          return;
        }

        if (!isMatch) {
          // 비밀번호가 일치하지 않는 경우
          res.status(401).json({ error: "잘못된 비밀번호" });
          return;
        }

        // 로그인 성공 시 세션에 사용자 정보 저장
        req.session.user = {
          id: user.id,
          username: user.username,
        };

        // 로그인 성공 시 쿠키 설정
        res.cookie("sessionID", req.sessionID, {
          maxAge: 3600000, // 쿠키 유효 기간 설정 (예: 1시간)
          httpOnly: true, // 클라이언트에서 쿠키 수정 방지
          secure: true, // HTTPS에서만 쿠키 전송
        });

        console.log("로그인 세션 정보:", req.session.user);

        res.json({ message: "로그인 성공" });
      });
    });
  });

  // 로그아웃
  router.post("/logout", (req, res) => {
    req.session.destroy((error) => {
      if (error) {
        console.error("로그아웃 오류: ", error);
        res.status(500).json({ error: "내부 서버 오류" });
        return;
      }

      // 로그아웃 시 쿠키 제거
      res.clearCookie("sessionID");

      res.json({ message: "로그아웃 성공" });
    });
  });

  return router;
};

export default userRouter;
