const http = require("http");
const getReq = require("./methods/get-request");
const postReq = require("./methods/post-request");
const putReq = require("./methods/put-request");
const deleteReq = require("./methods/delete-request");
let movies = require("./data/movies.json");
// require("dotenv").config();
const PORT = process.env.PORT || 5001;

// create http server
const server = http.createServer((req, res) => {
  req.movies = movies;
  switch (req.method) {
    case "GET":
      getReq(req, res);
      break;
    case "POST":
      postReq(req, res);
      break;
    case "PUT":
      putReq(req, res);
      break;
    case "DELETE":
      deleteReq(req, res);
      break;
    default:
      res.statusCode = 404;
      res.setHeader("Content-Type", "application/json");
      res.write(
        JSON.stringify({ title: "Not Found", message: "Route not found" })
      );
      res.end();
  }
  //   // throw a simple res
  //   res.statusCode = 200;
  //   res.setHeader("Content-Type", "application/json");
  //   //for send some data
  //   res.write(
  //     JSON.stringify({ message: "Hello Prince,Welcome to nodejs Course " })
  //   );
  //   res.end();
});

// listen the server on a PORT
server.listen(PORT, () => {
  console.log(`Server started on a Port : ${PORT}`);
});

// for post, put, delete request we will not able to see in the browser for that we need a http client
