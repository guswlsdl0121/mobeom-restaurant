CREATE USER 'manager'@'%' identified by 'man1234';
grant all privileges on  restdb.* to 'manager'@'%';

flush privileges;

select host,user,plugin,authentication_string from mysql.user;

#인증 프로토콜 버전 확인
SELECT authentication_string, plugin FROM mysql.user WHERE user = 'manager';

#인증 프로토콜 변경
ALTER USER 'manager'@'%' IDENTIFIED WITH mysql_native_password BY 'man1234';