import { Router } from 'express';
import { parseISO, isAfter, isBefore } from 'date-fns';

import { getById, getAll, create, update, remove } from '../db/expense';

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

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await remove(id);

    return res.json({ status: 'ok', data: result });
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
    // SQLite doesn't really have a date type
    // so have to parse this after fetching the data
    const sortedByDate = expenses
      .map((e) => ({
        ...e,
        date: parseISO(e.date)
      }))
      .sort((a, b) => {
        if (isBefore(a.date, b.date)) {
          return 1;
        } else if (isAfter(a.date, b.date)) {
          return -1;
        } else {
          return 0;
        }
      });

    return res.json({ status: 'ok', data: sortedByDate });
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
