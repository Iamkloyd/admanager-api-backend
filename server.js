
const express = require('express');
const { google } = require('googleapis');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

app.post('/fetch-data', async (req, res) => {
  const { client_id, client_secret, refresh_token, network_code } = req.body;

  const oauth2Client = new google.auth.OAuth2(client_id, client_secret);
  oauth2Client.setCredentials({ refresh_token });

  const adManager = google.adexchangebuyer({
    version: 'v1.4',
    auth: oauth2Client,
  });

  try {
    const result = await adManager.accounts.get({ accountId: network_code });
    res.json(result.data);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.listen(3000, () => console.log('Server running at http://localhost:3000'));
