import { Field, reduxForm } from "redux-form";

const StreamForm = ({handleSubmit, onSubmit}) => {
  const renderError = ({ error, touched }) => {
    if (touched && error) {
      return (
        <div className="ui error message">
          <div className="header">{error}</div>
        </div>
      );
    }
  };
  const renderInput = ({ input, label, meta }) => {
    const className = `field && ${meta.touched && meta.error ? "error" : ""}`;
    return (
      <div className={className}>
        <label>{label}</label>
        <input {...input} autoComplete="off" />
        <div>{renderError(meta)}</div>
      </div>
    );
  };



  return (
    <form
      className="ui form error"
      onSubmit={handleSubmit((formValues) => {onSubmit(formValues)})}
    >
      <Field name="title" component={renderInput} label="Enter Title" />
      <Field
        name="description"
        component={renderInput}
        label="Enter Description"
      />
      <button className="ui button primary">Submit</button>
    </form>
  );
};

const validate = (formValues) => {
  const errors = {};
  if (!formValues.title) {
    errors.title = "You must enter a title";
  }
  if (!formValues.description) {
    errors.description = "You must enter a description";
  }
  return errors;
};

export default reduxForm({ form: "streamForm", validate })(StreamForm);
