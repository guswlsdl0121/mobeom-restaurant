const sessionconf = {
  secret: "mySecretKey", // 세션 암호화에 사용되는 비밀키
  resave: false, // 변경 사항이 없어도 세션을 다시 저장할지 여부
  saveUninitialized: false, // 초기화되지 않은 세션을 저장할지 여부
  cookie: {
    secure: false, // HTTPS가 아닌 경우도 쿠키를 전송할 수 있도록 설정
    httpOnly: true, // 클라이언트 스크립트에서 세션 쿠키에 접근할 수 없도록 설정
  },
};

export default sessionconf;
