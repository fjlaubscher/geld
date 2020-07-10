import { Router } from 'express';
import { generateToken, sendToDiscord } from '../helpers/otp';

// db
import { create, remove, get } from '../db/auth';

const router = Router();

router.get('/otp', async (req, res) => {
  try {
    const auth = await create(generateToken());
    const result = await sendToDiscord(auth.token);
    if (result) {
      return res.json({ status: 'ok', data: 'OTP sent' });
    }

    return res.status(500).json({
      status: 'error',
      data: 'Unable to send token. Check Discord Webhook Url'
    });
  } catch (ex) {
    return res.status(500).json({ status: 'error', data: ex });
  }
});

router.post('/otp', async (req, res) => {
  try {
    const auth = await get(req.body.token);
    if (auth) {
      const result = await remove(auth.token);
      return res.json({ status: 'ok', data: result });
    }

    return res.status(401).json({ status: 'error', data: false });
  } catch (ex) {
    return res.status(500).json({ status: 'error', data: 'Something broke.' });
  }
});

export default router;
