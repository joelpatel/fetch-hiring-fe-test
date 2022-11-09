import { createRef, useImperativeHandle, forwardRef } from "react";
import InvalidReason from "../InvalidReason/InvalidReason";
import styles from "./Input.module.css";

const Input = forwardRef((props, ref) => {
  const inputRef = createRef();

  const focus = () => {
    inputRef.current.focus();
  };

  useImperativeHandle(ref, () => {
    return {
      focus: focus,
      current: inputRef.current,
    };
  });

  return (
    <>
      <div className="mb-2">
        <label htmlFor={props.id} className="text-xl font-medium inline">
          {props.label}
        </label>
      </div>
      <input
        id={props.id}
        type={props.type}
        placeholder={props.placeholder}
        className={`mb-4 p-2 bg-transparent border-2 rounded-md focus:outline-neutral-900 ${
          props.isValid === false ? styles["invalid"] : ""
        }`}
        onChange={props.onChange}
        ref={inputRef}
      />
      {props.isValid === false && <InvalidReason>{props.reason}</InvalidReason>}
    </>
  );
});

export default Input;
