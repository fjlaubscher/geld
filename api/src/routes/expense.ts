import { Router } from 'express';
import { isAfter, isBefore } from 'date-fns';
import { upload, deleteKey } from '../helpers/s3';
import { parseDateAndGetUrl } from '../helpers/data';

// db
import { getById, getAll, create, update, remove } from '../db/expense';

const router = Router();

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const expense = await getById(id);

    if (expense) {
      const parsed = await parseDateAndGetUrl(expense);

      return res.json({
        status: 'ok',
        data: parsed
      });
    } else {
      return res.status(404).json({
        status: 'error',
        data: `Expense with id:${id} does not exist`
      });
    }
  } catch (ex) {
    return res.status(500).json({ status: 'error', data: ex });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const expense = await getById(id);

    if (expense) {
      await deleteKey(expense.attachment);
      await remove(id);
      return res.json({ status: 'ok', data: true });
    }

    return res.json({ status: 'ok', data: false });
  } catch (ex) {
    return res.status(500).json({ status: 'error', data: ex });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const expense = await update(id, req.body);

    if (expense) {
      const parsed = await parseDateAndGetUrl(expense);

      return res.json({
        status: 'ok',
        data: parsed
      });
    } else {
      return res.status(404).json({
        status: 'error',
        data: `Expense with id:${id} does not exist`
      });
    }
  } catch (ex) {
    return res.status(500).json({ status: 'error', data: ex });
  }
});

router.get('/', async (req, res) => {
  try {
    const expenses = await getAll();

    // SQLite doesn't really have a date type
    // so have to parse this after fetching the data
    const parsedWithUrl = [];
    for (let i = 0; i < expenses.length; i++) {
      const parsed = await parseDateAndGetUrl(expenses[i]);
      parsedWithUrl.push(parsed);
    }

    const sortedByDate = parsedWithUrl.sort((a, b) => {
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

router.post('/', upload.single('attachment'), async (req, res) => {
  try {
    const expense = await create({
      ...req.body,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      attachment: (req.file as any).key
    });

    const parsed = await parseDateAndGetUrl(expense);

    return res.json({ status: 'ok', data: parsed });
  } catch (ex) {
    return res.status(500).json({ status: 'error', data: ex });
  }
});

export default router;
