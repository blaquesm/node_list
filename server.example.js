server.example.js;
const server = http.createServer(async (req, res) => {
  if (req.method === "GET") {
    const content = await fs.readFile(path.join(basePath, "index.html"));
    res.writeHead(200, {
      "Content-Type": "text/html",
    });
    res.end(content);
  } else if (req.method === "POST") {
    const body = [];
    res.writeHead(200, {
      "Content-Type": "text/plain; charset=utf-8",
    });

    req.on("data", (data) => {
      body.push(Buffer.from(data));
    });

    req.on("end", () => {
      const title = body.toString().split("=")[1].replaceAll("+", " ");
      addNote(title);

      res.end(`Title = ${title}`);
    });
  } else if (req.method === "DELETE") {
    const id = req.url.slice(1);
    console.log("ID from URL:", id);
    remove(id);
    res.writeHead(200, {
      "Content-Type": "text/plain; charset=utf-8",
    });
    res.end(`Note with id=${id} has been removed`);
  } else if (req.method === "PUT") {
    console.log("Received PUT request");
    const id = req.url.slice(1);
    console.log("ID from URL:", id);
    edit(id);
    res.writeHead(200, {
      "Content-Type": "text/plain; charset=utf-8",
    });
    res.end(`Note with id=${id} has been edited`);
  }
});
