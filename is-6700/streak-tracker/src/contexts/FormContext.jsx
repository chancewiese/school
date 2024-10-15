import React, { createContext, useContext, useState } from "react";

const FormContext = createContext();

export const useForm = () => useContext(FormContext);

export const FormProvider = ({ children }) => {
  const [state, setState] = useState({});
  const [errors, setErrors] = useState({});

  const register = (name, validations = {}) => ({
    name,
    onChange: (e) => setValue(name, e.target.value),
    value: state[name] || "",
  });

  const setValue = (name, value) => {
    setState((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const setError = (name, error) => {
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleSubmit = (onSubmit) => (e) => {
    e.preventDefault();
    onSubmit(state);
  };

  const value = {
    state,
    errors,
    register,
    setValue,
    setError,
    handleSubmit,
  };

  return <FormContext.Provider value={value}>{children}</FormContext.Provider>;
};

export const useInput = (name, validations = {}) => {
  const { register } = useForm();
  return register(name, validations);
};
