

import cloud from '@/cloud-sdk'
const Surreal = require("surrealdb.js").default;
const jwt_decode = require("jwt-decode").default;
const { isJwtExpired } = require("jwt-check-expiration");
const DB = new Surreal("http://152.136.153.160:8000/rpc");

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

exports.main = async function (ctx: FunctionContext) {
  const { auth, body, query,headers } = ctx
  console.log(Surreal, '0')
  console.log("DB",DB)
  console.log("=====")
  console.log(ctx)
    var params = {
    headers: headers,
  };
  var data = await main(params);
  return data
}
