var getRawBody = require("raw-body");
// var getFormBody = require("body/form");
var multipart = require("parse-multipart");
var RE_BOUNDARY = /^multipart\/.+?(?:; boundary=(?:(?:"(.+)")|(?:([^\s]+))))$/i;
const jwt_decode = require("jwt-decode").default;
const { isJwtExpired } = require("jwt-check-expiration");
// var jwt = require('jsonwebtoken');
const Surreal = require("surrealdb.js").default;
const DB = new Surreal("http://152.136.153.160:8000/rpc");

/*
https://jwt.io/
https://www.npmjs.com/package/jsonwebtoken
To enable the initializer feature (https://help.aliyun.com/document_detail/156876.html)
please implement the initializer function as below：
exports.initializer = (context, callback) => {
  console.log('initializing');
  callback(null, '');
};
*/

const main = (params) => {
  var { path, queries, headers, method, requestURI, clientIP, body } = params;
  var { authorization, ns, db } = headers;

  // console.log("queries", queries);
  // console.log(authorization);
  // console.log(ns, db);
  var token = null;
  if (authorization != null) {
    var parts = authorization.split(" ");
    if (parts.length === 2) {
      // var scheme = parts[0];
      token = parts[1];
      console.log("token", token);
      var decoded = jwt_decode(token);
      console.log(decoded);
      console.log("isJwtExpired", isJwtExpired(token));
    }
  }

  return new Promise(async (resolve, reject) => {
    // await DB.signin({
    //   user: "root",
    //   pass: "root",
    // });
    await DB.authenticate(token);

    await DB.use("test", "test");
    let groups = await DB.query("select * from project");
    resolve(groups[0]);
  });
};

exports.handler = async (req, resp, context) => {
  var params = {
    path: req.path,
    queries: req.queries,
    headers: req.headers,
    method: req.method,
    requestURI: req.url,
    clientIP: req.clientIP,
  };
  getRawBody(req, function (err, body) {
    console.log(body.toString());
    params.body = body.toString();
    // var m = RE_BOUNDARY.exec(req.headers["content-type"]);
    // var boundary = m[1] || m[2];
    // params.boundary = boundary;
    // console.log(boundary);
    // var parts = multipart.Parse(body, boundary);
    // for (var i = 0; i < parts.length; i++) {
    //   var part = parts[i];
    //   console.log("part.filename", part.filename);
    //   console.log("part.type", part.type);
    // }
  });

  // getFormBody(req, function (err, body) {
  //   console.log(body);
  // });

  var data = await main(params);

  // console.log(data);
  resp.setHeader("Content-Type", "application/json");
  resp.send(JSON.stringify(data, null, "    "));
};
