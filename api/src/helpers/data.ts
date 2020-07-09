import { parseISO } from 'date-fns';
import { getSignedUrl } from './s3';

export const parseDateAndGetUrl = async (input: Geld.Income | Geld.Expense) => {
  // first get pre-signed url
  const attachment = input.attachment
    ? await getSignedUrl(input.attachment)
    : null;

  return {
    ...input,
    date: parseISO(input.date),
    attachment
  };
};
