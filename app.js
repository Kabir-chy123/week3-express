import express from "express";
import path from "path";

const app = express();
const port = 3000;

const publicPath = path.join(process.cwd(), "public");

app.use("/public", express.static(publicPath));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/api/v1/cats", (req, res) => {
  const cat = {
    cat_id: 1,
    name: "Milo",
    birthdate: "2022-05-15",
    weight: 4.5,
    owner: "Kabir",
    image: "https://loremflickr.com/320/240/cat",
  };

  res.json(cat);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
