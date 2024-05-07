const Input = ({ name, type, placeholder, register, errors }) => {
  return (
    <div className="form-floating mb-3">
      <input
        {...register}
        name={name}
        type={type}
        className="form-control"
        id={name}
        placeholder={placeholder}
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
