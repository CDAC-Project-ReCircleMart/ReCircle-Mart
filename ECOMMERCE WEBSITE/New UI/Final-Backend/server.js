require("dotenv").config();

const app = require("./app"); // IMPORT app.js (THIS IS THE FIX)

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
