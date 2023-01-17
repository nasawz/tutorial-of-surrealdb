---
sidebar_position: 1
---

# 权限认证


## 启用权限认证功能

``` sql
DEFINE SCOPE account SESSION 24h
	SIGNUP ( CREATE user SET username = $username, pass = crypto::argon2::generate($pass) )
	SIGNIN ( SELECT * FROM user WHERE username = $username AND crypto::argon2::compare(pass, $pass) )
;
```

``` bash
curl 'http://0.0.0.0:8000/sql' \
  -H 'Accept: application/json' \
  -H 'Accept-Language: zh-CN,zh;q=0.9,ja-JP;q=0.8,ja;q=0.7,zh-MO;q=0.6,zh-HK;q=0.5,zh-TW;q=0.4' \
  -H 'Authorization: Basic cm9vdDpyb290' \
  -H 'Content-Type: text/plain' \
  -H 'DB: test' \
  -H 'NS: test' \
  -H 'Origin: http://localhost:3000' \
  -H 'Proxy-Connection: keep-alive' \
  -H 'Referer: http://localhost:3000/' \
  -H 'User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36' \
  --data-raw $'DEFINE SCOPE account SESSION 24h\n    SIGNUP ( CREATE user SET username = $username, pass = crypto::argon2::generate($pass) )\n    SIGNIN ( SELECT * FROM user WHERE username = $username AND crypto::argon2::compare(pass, $pass) )\n;' \
  --compressed \
  --insecure
```
> 24h 为session时长 可选 m、y， 1y时长为1年。

返回以下结果证明成功

``` json
[
  {
    "time": "177.849µs",
    "status": "OK",
    "result": null
  }
]
```


## 测试注册

注意替换端点：http://0.0.0.0:8000/signup

``` json
{
  "NS": "test",
  "DB": "test",
  "SC": "account",
  "username": "nasawz",
  "pass": "1234567890"
}
```

``` bash
curl 'http://0.0.0.0:8000/signup' \
  -H 'Accept: application/json' \
  -H 'Accept-Language: zh-CN,zh;q=0.9,ja-JP;q=0.8,ja;q=0.7,zh-MO;q=0.6,zh-HK;q=0.5,zh-TW;q=0.4' \
  -H 'Content-Type: application/json' \
  -H 'DB: test' \
  -H 'NS: test' \
  -H 'Origin: http://localhost:3000' \
  -H 'Proxy-Connection: keep-alive' \
  -H 'Referer: http://localhost:3000/' \
  -H 'User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36' \
  --data-raw $'{\n  "NS": "test",\n  "DB": "test",\n  "SC": "account",\n  "username": "nasawz",\n  "pass": "1234567890"\n}' \
  --compressed \
  --insecure
```
返回以下结果证明成功

``` json
{
  "code": 200,
  "details": "Authentication succeeded",
  "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJpYXQiOjE2NzM5NDAzMzcsIm5iZiI6MTY3Mzk0MDMzNywiZXhwIjoxNjc0MDI2NzM3LCJpc3MiOiJTdXJyZWFsREIiLCJOUyI6InRlc3QiLCJEQiI6InRlc3QiLCJTQyI6ImFjY291bnQiLCJJRCI6InVzZXI6cmxueHhremJ6YmcyNnNua3dpbnAifQ.MAIM4XZwNIz2dYnlCsQSt771h-yUYki9AyVDw3Muw439qF2i7H1A3e5-FVoWQBd6GWMQjauNEi5Hs9_b1S0xJA"
}
```

## 测试登录

注意替换端点：http://0.0.0.0:8000/signin

``` json
{
  "NS": "test",
  "DB": "test",
  "SC": "account",
  "username": "nasawz",
  "pass": "1234567890"
}
```

``` bash
curl 'http://0.0.0.0:8000/signin' \
  -H 'Accept: application/json' \
  -H 'Accept-Language: zh-CN,zh;q=0.9,ja-JP;q=0.8,ja;q=0.7,zh-MO;q=0.6,zh-HK;q=0.5,zh-TW;q=0.4' \
  -H 'Content-Type: application/json' \
  -H 'DB: test' \
  -H 'NS: test' \
  -H 'Origin: http://localhost:3000' \
  -H 'Proxy-Connection: keep-alive' \
  -H 'Referer: http://localhost:3000/' \
  -H 'User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36' \
  --data-raw $'{\n  "NS": "test",\n  "DB": "test",\n  "SC": "account",\n  "username": "nasawz",\n  "pass": "1234567890"\n}' \
  --compressed \
  --insecure
```

返回以下结果证明成功

``` json
{
  "code": 200,
  "details": "Authentication succeeded",
  "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJpYXQiOjE2NzM5NDA1OTcsIm5iZiI6MTY3Mzk0MDU5NywiZXhwIjoxNjc0MDI2OTk3LCJpc3MiOiJTdXJyZWFsREIiLCJOUyI6InRlc3QiLCJEQiI6InRlc3QiLCJTQyI6ImFjY291bnQiLCJJRCI6InVzZXI6cmxueHhremJ6YmcyNnNua3dpbnAifQ.m9NvKo7-g5oRbxcvpJfjAYnqAS95mddlKicPuNpaMmUNtF4Kb02R71GND0fr_MY2TbTO1gbKN6l71N7lpO636w"
}
```

---

其中 `token` 可用作JWT认证, 组合方式：
```
Authorization: Bearer + `token`
``` 

## 表权限定义

``` sql
DEFINE TABLE project SCHEMALESS
	PERMISSIONS
		FOR select
			-- Published projects can be selected
			WHERE published = true
			-- A user can select all their own projects
			OR user = $auth.id
		FOR create, update
			-- A user can create or update their own projects
			WHERE user = $auth.id
		FOR delete
			-- A user can delete their own projects
			WHERE user = $auth.id
			-- Or an admin can delete any projects
			OR $auth.admin = true
;

```

``` bash
curl 'http://0.0.0.0:8000/sql' \
  -H 'Accept: application/json' \
  -H 'Accept-Language: zh-CN,zh;q=0.9,ja-JP;q=0.8,ja;q=0.7,zh-MO;q=0.6,zh-HK;q=0.5,zh-TW;q=0.4' \
  -H 'Authorization: Basic cm9vdDpyb290' \
  -H 'Content-Type: text/plain' \
  -H 'DB: test' \
  -H 'NS: test' \
  -H 'Origin: http://localhost:3000' \
  -H 'Proxy-Connection: keep-alive' \
  -H 'Referer: http://localhost:3000/' \
  -H 'User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36' \
  --data-raw $'DEFINE TABLE project SCHEMALESS\n\u0009PERMISSIONS\n\u0009\u0009FOR select\n\u0009\u0009\u0009-- Published projects can be selected\n\u0009\u0009\u0009WHERE published = true\n\u0009\u0009\u0009-- A user can select all their own projects\n\u0009\u0009\u0009OR user = $auth.id\n\u0009\u0009FOR create, update\n\u0009\u0009\u0009-- A user can create or update their own projects\n\u0009\u0009\u0009WHERE user = $auth.id\n\u0009\u0009FOR delete\n\u0009\u0009\u0009-- A user can delete their own projects\n\u0009\u0009\u0009WHERE user = $auth.id\n\u0009\u0009\u0009-- Or an admin can delete any projects\n\u0009\u0009\u0009OR $auth.admin = true\n;' \
  --compressed \
  --insecure
```

## 测试写入数据

``` sql
CREATE project content {
	name:"demo",
	user: $auth
}
```

``` bash
curl 'http://0.0.0.0:8000/sql' \
  -H 'Accept: application/json' \
  -H 'Accept-Language: zh-CN,zh;q=0.9,ja-JP;q=0.8,ja;q=0.7,zh-MO;q=0.6,zh-HK;q=0.5,zh-TW;q=0.4' \
  -H 'Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJpYXQiOjE2NzM5NDEwMDAsIm5iZiI6MTY3Mzk0MTAwMCwiZXhwIjoxNjc0MDI3NDAwLCJpc3MiOiJTdXJyZWFsREIiLCJOUyI6InRlc3QiLCJEQiI6InRlc3QiLCJTQyI6ImFjY291bnQiLCJJRCI6InVzZXI6cmxueHhremJ6YmcyNnNua3dpbnAifQ.O8Z0MVvjbO05fg7DKnNIAOMQjWXAUpkK0RtzG2fForzQswB0w0Ycxq9MmqrTHB-kD6LKJA24tir7TjVRVrQNlw' \
  -H 'Content-Type: text/plain' \
  -H 'DB: test' \
  -H 'NS: test' \
  -H 'Origin: http://localhost:3000' \
  -H 'Proxy-Connection: keep-alive' \
  -H 'Referer: http://localhost:3000/' \
  -H 'User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36' \
  --data-raw $'CREATE project content {\n\u0009name:"demo",\n\u0009user: $auth\n}' \
  --compressed \
  --insecure
```

返回

``` json
[
  {
    "time": "261.874µs",
    "status": "OK",
    "result": [
      {
        "id": "project:q9igqsw0mam9c425g7fl",
        "name": "demo",
        "user": "user:rlnxxkzbzbg26snkwinp"
      }
    ]
  }
]
```

## 测试读取数据

``` sql
select * from project;
```

``` bash
curl 'http://0.0.0.0:8000/sql' \
  -H 'Accept: application/json' \
  -H 'Accept-Language: zh-CN,zh;q=0.9,ja-JP;q=0.8,ja;q=0.7,zh-MO;q=0.6,zh-HK;q=0.5,zh-TW;q=0.4' \
  -H 'Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJpYXQiOjE2NzM5NDEwMDAsIm5iZiI6MTY3Mzk0MTAwMCwiZXhwIjoxNjc0MDI3NDAwLCJpc3MiOiJTdXJyZWFsREIiLCJOUyI6InRlc3QiLCJEQiI6InRlc3QiLCJTQyI6ImFjY291bnQiLCJJRCI6InVzZXI6cmxueHhremJ6YmcyNnNua3dpbnAifQ.O8Z0MVvjbO05fg7DKnNIAOMQjWXAUpkK0RtzG2fForzQswB0w0Ycxq9MmqrTHB-kD6LKJA24tir7TjVRVrQNlw' \
  -H 'Content-Type: text/plain' \
  -H 'DB: test' \
  -H 'NS: test' \
  -H 'Origin: http://localhost:3000' \
  -H 'Proxy-Connection: keep-alive' \
  -H 'Referer: http://localhost:3000/' \
  -H 'User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36' \
  --data-raw 'select * from project;' \
  --compressed \
  --insecure
```