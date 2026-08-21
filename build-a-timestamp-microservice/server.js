import express from "express";
import cors from "cors";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();

app.use(cors({ optionsSuccessStatus: 200 }));

app.use(express.static("public"));

app.get("/", (_req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

// Do not change code above this line


app.get(['/api', '/api/:date'], (req, res) => {
  let validDate;
  
  if(!req.params.date) {
    // Empty parameter - return current time
    validDate = new Date();
  } else {
    // Try parsing as number first (Unix timestamp), then as date string
    validDate = new Date(Number(req.params.date) || req.params.date);
  }

  if(!isNaN(validDate.getTime())) {
    res.send({ 
      unix: validDate.getTime(), 
      utc: validDate.toUTCString() 
    });
  } else {
    res.send({ error: "Invalid Date" });
  }
});


// Do not change code below this line

const PORT = 8000;
const listener = app.listen(PORT, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
