import fetch from 'node-fetch';

export const generateToken = () => {
  const OTP = [];
  for (let i = 0; i < 4; i++) {
    OTP.push(Math.floor(Math.random() * 9));
  }

  return OTP.join('');
};

export const sendToDiscord = async (token: string) => {
  const url = process.env.DISCORD_WEBHOOK;

  if (url) {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ content: `OTP: ${token}` })
    });

    return response.ok;
  }

  return false;
};
