import { Router } from 'express';
import { parseISO, isAfter, isBefore } from 'date-fns';

import {
  getById,
  getAll,
  create,
  getTaxableAmount,
  update,
  remove
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
    const income = await update(id, req.body);

    return res.json({ status: 'ok', data: income || null });
  } catch (ex) {
    return res.status(500).json({ status: 'error', data: ex });
  }
});

router.get('/', async (req, res) => {
  try {
    const income = await getAll();
    // SQLite doesn't really have a date type
    // so have to parse this after fetching the data
    const sortedByDate = income
      .map((i) => ({
        ...i,
        date: parseISO(i.date)
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
    const income = await create(req.body);
    return res.json({ status: 'ok', data: income });
  } catch (ex) {
    return res.status(500).json({ status: 'error', data: ex });
  }
});

export default router;
