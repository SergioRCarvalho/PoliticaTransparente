import clsx from 'clsx';
import { forwardRef } from 'react';
import styles from './Input.module.css';
import TextField from '@mui/material/TextField';

const Input = forwardRef(function Input(
  {
    label,
    placeholder,
    className,
    htmlType,
    autoComplete,
    size,
    ariaLabel,
    required,
    defaultValue,
  },
  ref
) {
  return (
    <div className={clsx(styles.root, className)}>
      <label>
        <TextField
          label={label}
          type={htmlType}
          autoComplete={autoComplete}
          placeholder={placeholder}
          inputRef={ref}
          className={clsx(styles.input, size && styles[size])}
          aria-label={ariaLabel}
          required={required}
          defaultValue={defaultValue}
        />
      </label>
    </div>
  );
});

export default Input;
