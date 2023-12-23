import express from "express";
import cors from "cors";
import {
  displayMobiles,
  filterByMemory,
  filterByName,
  filterByPrice,
  filterByProcessor,
  mobileDetails,
} from "./controller/MobileController.js";

const app = express();
const PORT = 8000;

app.use(express.json());

app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello, this is the backend!");
});

app.get("/api/displayMobiles", displayMobiles);

app.get("/api/mobiles/:mobileId", mobileDetails);

app.post("/api/filterByPrice", filterByPrice);

app.post("/api/filterByName", filterByName);

app.post("/api/filterByProcessor", filterByProcessor);

app.post("/api/filterByMemory", filterByMemory);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
