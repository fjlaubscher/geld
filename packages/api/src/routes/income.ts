import { Router } from 'express';

import {
  getById,
  getAll,
  create,
  getTaxableAmount,
  update
} from '../db/income';

const router = Router();

router.get('/taxable', async (req, res) => {
  try {
    const income = await getTaxableAmount();

    return res.json({ status: 'ok', data: income });
  } catch (ex) {
    return res.status(500).json({ status: 'error', data: ex });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const income = await getById(id);

    return res.json({ status: 'ok', data: income || null });
  } catch (ex) {
    return res.status(500).json({ status: 'error', data: ex });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const income = await update(id, req.body);

    return res.json({ status: 'ok', data: income || null });
  } catch (ex) {
    return res.status(500).json({ status: 'error', data: ex });
  }
});

router.get('/', async (req, res) => {
  try {
    const income = await getAll();

    return res.json({ status: 'ok', data: income });
  } catch (ex) {
    return res.status(500).json({ status: 'error', data: ex });
  }
});

router.post('/', async (req, res) => {
  try {
    const income = await create(req.body);
    return res.json({ status: 'ok', data: income });
  } catch (ex) {
    return res.status(500).json({ status: 'error', data: ex });
  }
});

export default router;
