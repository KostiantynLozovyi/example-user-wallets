import React from "react";
import "./index.css";

export default function Input(props) {
  const { value, onChange, placeholder } = props;

  return (
    <div className="input-wrapper">
      <input
        placeholder={placeholder}
        className="input"
        value={value}
        onChange={onChange}
      />
      <span className="focus-border"></span>
    </div>
  );
}
