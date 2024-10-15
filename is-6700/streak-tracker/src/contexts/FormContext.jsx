import React, { createContext, useContext, useState } from "react";

const FormContext = createContext();

export const FormProvider = ({ children }) => {
   const [state, setState] = useState({});

   const setValue = (name, value) => {
      setState((prev) => ({ ...prev, [name]: value }));
   };

   const handleSubmit = (onSubmit) => (e) => {
      e.preventDefault();
      onSubmit(state);
   };

   const value = {
      state,
      setValue,
      handleSubmit,
   };

   return <FormContext.Provider value={value}>{children}</FormContext.Provider>;
};

export const useForm = () => {
   const context = useContext(FormContext);
   if (!context) {
      throw new Error("useForm must be used within a FormProvider");
   }
   return context;
};

export const useInput = (name) => {
   const { state, setValue } = useForm();
   return {
      value: state[name] || "",
      onChange: (e) => setValue(name, e.target.value),
   };
};
