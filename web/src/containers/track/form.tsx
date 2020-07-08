import React from 'react';
import { Form as FinalForm, Field } from 'react-final-form';
import { FORM_ERROR } from 'final-form';

// components
import Input from '../../components/input';

import { required } from './validation';

interface FormFields {
  date: string;
  description: string;
  amount: string;
  kind: 'expense' | 'income';
  attachment?: string;
}

const Form = () => (
  <FinalForm
    onSubmit={async (
      { date, description, amount, kind, attachment }: FormFields,
      form
    ) => {
      const body = {
        date,
        description,
        amount: parseFloat(amount),
        attachment
      };
      try {
        const response = await fetch(`/api/${kind}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(body)
        });

        if (response.ok) {
          // reset form to track more
          form.reset();
          return true;
        } else {
          return { [FORM_ERROR]: `Unable to track ${kind}.` };
        }
      } catch (ex) {
        return { [FORM_ERROR]: `Unable to track ${kind}.` };
      }
    }}
    render={({
      handleSubmit,
      submitting,
      pristine,
      submitError,
      submitSucceeded,
      valid
    }) => (
      <form onSubmit={handleSubmit}>
        {submitSucceeded && (
          <div className="notification is-success">Tracked.</div>
        )}
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
              <option value="expense" selected>
                Expense
              </option>
              <option value="income">Income</option>
            </Field>
          </div>
        </div>
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
