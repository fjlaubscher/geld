import { Router } from 'express';
import { isAfter, isBefore } from 'date-fns';
import { upload, deleteKey } from '../helpers/s3';
import { parseDateAndGetUrl } from '../helpers/data';

// db
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

    if (income) {
      const parsed = await parseDateAndGetUrl(income);

      return res.json({
        status: 'ok',
        data: parsed
      });
    } else {
      return res
        .status(404)
        .json({ status: 'error', data: `Income with id:${id} does not exist` });
    }
  } catch (ex) {
    return res.status(500).json({ status: 'error', data: ex });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const income = await getById(id);

    if (income) {
      await deleteKey(income.attachment);
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
    const income = await update(id, req.body);

    if (income) {
      const parsed = await parseDateAndGetUrl(income);

      return res.json({
        status: 'ok',
        data: parsed
      });
    } else {
      return res
        .status(404)
        .json({ status: 'error', data: `Income with id:${id} does not exist` });
    }
  } catch (ex) {
    return res.status(500).json({ status: 'error', data: ex });
  }
});

router.get('/', async (req, res) => {
  try {
    const income = await getAll();

    // SQLite doesn't really have a date type
    // so have to parse this after fetching the data
    const parsedWithUrl = [];
    for (let i = 0; i < income.length; i++) {
      const parsed = await parseDateAndGetUrl(income[i]);
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
    const income = await create({
      ...req.body,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      attachment: (req.file as any).key
    });

    const parsed = await parseDateAndGetUrl(income);

    return res.json({ status: 'ok', data: parsed });
  } catch (ex) {
    return res.status(500).json({ status: 'error', data: ex });
  }
});

export default router;
