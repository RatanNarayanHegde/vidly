import React from "react";

const Input = ({ name, value, label, error, onChange }) => {
  return (
    <div className="form-group">
      <label htmlFor={name} className="for">
        {label}
      </label>
      <input
        value={value}
        id={name}
        type="text"
        name={name}
        className="form-control"
        onChange={onChange}
      />
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default Input;
