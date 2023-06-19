import express from "express";
import session from "express-session";
import cors from "cors";
import bodyParser from "body-parser";
import mysql from "mysql";

import restaurantRouter from "./restaurantRouter.js";
import scrapRouter from "./scrapRouter.js";
import userRouter from "./userRouter.js";
import ratingRouter from "./ratingRouter.js";

import dbconf from "./conf/auth.js";
import sessionconf from "./conf/session.js";

const app = express();
const port = 3010;
const db = mysql.createConnection(dbconf);

db.connect();

app.use(session(sessionconf));
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
    exposedHeaders: "X-Total-Count", // 노출할 헤더 옵션 추가
  })
);
app.use(bodyParser.json());

// 미들웨어 함수: 로그인 상태 확인
const isLoggedIn = (req, res, next) => {
  if (req.session.user) {
    // 사용자가 로그인한 상태입니다.
    next();
  } else {
    // 사용자가 로그인하지 않은 상태입니다.
    res.status(401).json({ error: "Unauthorized" });
  }
};

app.get("/", (req, res) => {
  res.json({ result: "success" });
});

// 로그인 상태를 확인하는 API 엔드포인트
app.get("/checkLoginStatus", isLoggedIn, (req, res) => {
  // 사용자가 로그인한 상태입니다.
  res.json({ loggedIn: true });
});

app.use("/user", userRouter(db));
app.use("/restaurants", restaurantRouter(db));
app.use("/scrap", scrapRouter(db));
app.use("/rating", ratingRouter(db));

app.listen(port, () => {
  console.log(`서버가 포트 ${port}에서 실행 중입니다.`);
});
