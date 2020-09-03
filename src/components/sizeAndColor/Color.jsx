import React, { useState } from "react";


function Color(props) {
  const [fields, setFields] = useState([{ value: null }]);


  const {colorCallBack}= props
  colorCallBack(fields)

  function handleChange(i, event) {
    const values = [...fields];
    values[i].value = event.target.value;
    setFields(values);
  }

  function handleAdd() {
    const values = [...fields];
    values.push({ value: null });
    setFields(values);
  }

  function handleRemove(i) {
    const values = [...fields];
    values.splice(i, 1);
    setFields(values);
  }

  return (
    <div className="specification">
    <span className="i1-heading">Product color</span>
    <span className="i1-heading-border"></span>
      <button className="specification-button-add" type="button" onClick={() => handleAdd()}>
        +
      </button>

      {fields.map((field, idx) => {
        return (
          <div key={`${field}-${idx}`}>
            <input className="sizeColorInput"
              type="text"
              placeholder="Enter product color"
              value={field.value || ""}
              onChange={e => handleChange(idx, e)}
              required
            />
            <button className="specification-button-remove" type="button" onClick={() => handleRemove(idx)}>
              X
            </button>
          </div>
        );
      })}
    </div>
  );
}

export default Color
