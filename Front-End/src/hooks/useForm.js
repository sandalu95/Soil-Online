import { useState } from "react";

export default function useForm(onSubmit, validate) {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});

  const handleSubmit = (event) => {
    if (event) event.preventDefault();
    const err = validate(values);
    setErrors(err);
    if (Object.keys(err).length === 0) {
      onSubmit(values);
    }
  };

  const handleChange = (name) => {
    return (event) => {
      event.persist();
      setValues((prevValues) => ({
        ...prevValues,
        [name]: event.target.value,
      }));
    };
  };

  const fieldOf = (name) => ({
    value: values[name] || "",
    error: errors[name],
    onChange: handleChange(name),
  });

  return {
    handleSubmit,
    fieldOf,
  };
}
