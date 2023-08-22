module.exports = (req, res) => {
  //fetching base url
  let baseUrl = req.url.substring(0, req.url.lastIndexOf("/") + 1);

  //fetching id
  let id = req.url.split("/")[3];

  // regex to validate the id
  const regexV4 = new RegExp(
    /^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i
  );

  console.log("id :", id);
  if (req.url === "/api/movies") {
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.write(JSON.stringify(req.movies));
    res.end();
  } else if (!regexV4.test(id)) {
    res.writeHead(400, { "Content-Type": "application/json" });
    res.end(
      JSON.stringify({
        title: "Validation Failed",
        message: "UUID is not Valid",
      })
    );
  } else if (baseUrl === "/api/movies/" && regexV4.test(id)) {
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");

    // filter the movie on the basis of id
    let filteredMovie = req.movies.filter((movie) => {
      return movie.id === id;
    });

    if (filteredMovie.length > 0) {
      res.statusCode = 200;
      res.write(JSON.stringify(filteredMovie));
      res.end();
    } else {
      res.statusCode = 404;
      res.write(
        JSON.stringify({ title: "Not Found", message: "Movie not found" })
      );
      res.end();
    }
  } else {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ title: "Not Found", message: "Route not found" }));
  }
};
