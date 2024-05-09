const Textarea = ({ name, register, placeholder, errors }) => {
  return (
    <div className={`form-floating mb-3 message`}>
      <textarea
        {...register}
        name={name}
        className="form-control"
        placeholder={placeholder}
        id={name}
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

export default Textarea;
