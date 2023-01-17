---
sidebar_position: 3
---

# 权限定义参考

**Granular Table Permissions**
```
DEFINE TABLE granular_access SCHEMALESS PERMISSIONS
FOR select FULL
FOR create,update WHERE $token.someOtherValue = "justToShowThatWeCan"
FOR delete NONE;
```

**Granular Field Permissions**
```
DEFINE field more_granular ON TABLE granular_access PERMISSIONS
FOR select FULL
FOR create,update WHERE $token.someOtherValue = "justToShowThatWeCan"
FOR delete NONE;
```


**Accessing Token & Auth Data from Queries**
```
SELECT * FROM $session;
SELECT * FROM $token;
SELECT * FROM $scope;
SELECT * FROM $auth;
```