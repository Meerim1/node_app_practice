const fs = require("fs");

const requestHandler = (req, res) => {
  const url = req.url;
  const method = req.method;
  if (url === "/") {
    res.setHeader("Content-Type", "text/html");
    res.write("<html>");
    res.write("<head><title>Enter message</title></head>");
    res.write(
      "<body><form action='/message' method='POST'><input type='text' name='someMessage'><button type='submit'>Send</button>Hello from my Node.js Server!</form></body>"
    );
    res.write("</html>");
    return res.end();
  }
  if (url === "/message" && method === "POST") {
    const body = [];
    req.on("data", (chunk) => {
      body.push(chunk);
    });
    return req.on("end", () => {
      const parsedBody = Buffer.concat(body).toString();
      const msg = parsedBody.split("=")[1];
      fs.writeFile("message.text", msg, (err) => {
        res.statusCode = 302;
        res.setHeader("Location", "/");
        return res.end();
      });
    });
  }
  res.setHeader("Content-Type", "text/html");
  res.write("<html>");
  res.write("<head><title>My app title</title></head>");
  res.write("<body><h1>Hello from my Node.js Server!</h1></body>");
  res.write("</html>");
};

module.exports = {
  handler: requestHandler,
};

// module.exports.handler = requestHandler;
// module.exports = requestHandler // as default

// also works without module. as a shortcut
// exports.handler = requestHandler
// exports = requestHandler; // as default
