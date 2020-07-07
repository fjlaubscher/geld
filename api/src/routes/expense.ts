import { Router } from 'express';

import { getById, getAll, create, update } from '../db/expense';

const router = Router();

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const expense = await getById(id);

    return res.json({ status: 'ok', data: expense || null });
  } catch (ex) {
    return res.status(500).json({ status: 'error', data: ex });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const expense = await update(id, req.body);

    return res.json({ status: 'ok', data: expense });
  } catch (ex) {
    return res.status(500).json({ status: 'error', data: ex });
  }
});

router.get('/', async (req, res) => {
  try {
    const expenses = await getAll();

    return res.json({ status: 'ok', data: expenses });
  } catch (ex) {
    return res.status(500).json({ status: 'error', data: ex });
  }
});

router.post('/', async (req, res) => {
  try {
    const expense = await create(req.body);
    return res.json({ status: 'ok', data: expense });
  } catch (ex) {
    return res.status(500).json({ status: 'error', data: ex });
  }
});

export default router;
