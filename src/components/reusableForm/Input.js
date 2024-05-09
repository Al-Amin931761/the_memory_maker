const Input = ({
  name,
  type,
  placeholder,
  register,
  errors,
  className = "mb-3",
  value = undefined,
  disabled = false,
}) => {
  return (
    <div className={`form-floating ${className}`}>
      <input
        {...register}
        name={name}
        type={type}
        className="form-control"
        id={name}
        placeholder={placeholder}
        value={value}
        disabled={disabled}
      />
      <label htmlFor={name}>{placeholder}</label>

      {errors[name] && (
        <p style={{ fontSize: "12px" }} className="text-danger mt-1 ms-1">
          {errors[name].message}
        </p>
      )}
    </div>
  );
};

export default Input;
