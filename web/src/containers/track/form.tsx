import React from 'react';
import { Form as FinalForm, Field } from 'react-final-form';
import { FORM_ERROR } from 'final-form';

// components
import FileUpload from '../../components/file-upload';
import Input from '../../components/input';

import { required } from './validation';

interface FormFields {
  date: string;
  description: string;
  amount: string;
  kind: 'expense' | 'income';
}

interface Props {
  onSubmit: (
    type: 'expense' | 'income',
    tracked: Geld.Income | Geld.Expense
  ) => void;
}

const Form = ({ onSubmit }: Props) => (
  <FinalForm
    initialValues={{ kind: 'expense' }}
    onSubmit={async ({ date, description, amount, kind }: FormFields) => {
      const fileInput = document.getElementById(
        'attachment'
      ) as HTMLInputElement;
      const file = fileInput?.files?.item(0) as File;

      const body = new FormData();
      body.append('date', date);
      body.append('description', description);
      body.append('amount', amount);
      body.append('attachment', file);

      try {
        const response = await fetch(`/api/${kind}`, {
          method: 'POST',
          body
        });
        const { data } = await response.json();
        onSubmit(kind, data);
        return true;
      } catch (ex) {
        console.error(ex);
        return { [FORM_ERROR]: `Unable to track ${kind}.` };
      }
    }}
    render={({
      handleSubmit,
      submitting,
      pristine,
      submitError,
      valid,
      form
    }) => (
      <form
        onSubmit={(values) => handleSubmit(values)?.then(() => form.reset())}
      >
        {submitError && (
          <div className="notification is-danger">{submitError}</div>
        )}
        <Field
          name="date"
          label="Date"
          component={Input}
          validate={required}
          type="date"
        />
        <Field
          name="description"
          label="Description"
          component={Input}
          validate={required}
          type="text"
        />
        <Field
          name="amount"
          label="Amount"
          component={Input}
          validate={required}
          type="tel"
        />
        <div className="field">
          <label className="label" htmlFor="kind">
            Type
          </label>
          <div className="select is-fullwidth">
            <Field id="kind" name="kind" component="select">
              <option value="expense">Expense</option>
              <option value="income">Income</option>
            </Field>
          </div>
        </div>
        <Field
          id="attachment"
          name="attachment"
          label="Attachment"
          component={FileUpload}
          validate={required}
        />
        <button
          type="submit"
          className={`button is-fullwidth is-primary ${
            submitting && 'is-loading'
          }`}
          disabled={pristine || submitting || !valid}
        >
          Submit
        </button>
      </form>
    )}
  />
);

export default Form;
