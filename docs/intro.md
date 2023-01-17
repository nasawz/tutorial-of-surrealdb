---
sidebar_position: 1
---

# 部署


**Docker 方式部署**
```
docker run --name surrealdb -d -p 8000:8000 -v /home/lighthouse/surrealDB:/surrealDB surrealdb/surrealdb:latest start --user root --pass root file://./surrealDB
```

**服务端点：** xxx.xxx.xxx.xxx:8000

**测试服务器可用性**

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
  --data-raw 'info for db' \
  --compressed \
  --insecure
```

返回以下结果证明部署成功
``` json
[{"time":"94.211µs","status":"OK","result":{"dl":{},"dt":{},"sc":{},"tb":{}}}]
```
