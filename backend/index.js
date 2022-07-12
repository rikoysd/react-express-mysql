const express = require("express");
const app = express();
const mysql = require("mysql2");
// ポートの指定
// process.env.porは環境変数portにあるものなら何でもok
const port = process.env.port || 3001;

const connection = mysql.createConnection({
  host: "localhost",
  user: "testuser001",
  password: "test001",
  database: "dorama",
});

// 取得
app.get("/api", (req, res) => {
  connection.query("SELECT * FROM `list`", function (err, results, fields) {
    if (err) {
      console.log("接続終了（異常）");
      console.error(err);
    }
    // corsの設定　別のオリジンともリソースの共有を可能にする.
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
    let arr = [];
    for (let result of results) {
      let obj = {
        id: result.id,
        title: result.title,
        description: result.description,
        date: result.date,
      };
      arr.push(obj);
    }
    res.json(arr);
  });
  console.log("接続終了（正常）");
});

// サーバーが起動後にportに接続
app.listen(port, () => {
  console.log(`listening on ${port}`);
});

// node index.jsでサーバー起動
