import { useState } from "react";

export const useForm = (valoresIniciales = {}) => {
  const [form, setForm] = useState(valoresIniciales);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleReset = () => {
    setForm(valoresIniciales);
  };

  return {
    form,
    handleInputChange,
    handleReset,
  };
};