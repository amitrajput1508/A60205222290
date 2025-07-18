const axios = require('axios');
require('dotenv').config();

let accessToken = null;

// Step 1: Get access token dynamically
const getAccessToken = async () => {
  try {
    const res = await axios.post('http://20.244.56.144/evaluation-service/auth', {
      email: process.env.EMAIL,
      name: process.env.NAME,
      rollNo: process.env.ROLL_NO,
      accessCode: process.env.ACCESS_CODE,
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    accessToken = res.data.access_token;
    return accessToken;
  } catch (err) {
    console.error("❌ Failed to get access token:", err.response?.data || err.message);
    return null;
  }
};

// Step 2: Log function
const Log = async (stack, level, pkg, message) => {
  try {
    // Get new access token if needed
    if (!accessToken) {
      await getAccessToken();
    }

    const response = await axios.post(
      'http://20.244.56.144/evaluation-service/logs',
      {
        stack,
        level,
        package: pkg,
        message
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        }
      }
    );

    console.log("✅ Log created:", response.data);
  } catch (err) {
    console.error("❌ Log failed:", {
      status: err.response?.status,
      data: err.response?.data,
      token_preview: accessToken?.slice(0, 30) + '...'
    });
  }
};

module.exports = Log;
