const TogglePassword = ({ showPassword, setShowPassword }) => {
  return (
    <div className="mb-3">
      <input
        onClick={() => setShowPassword(!showPassword)}
        className="form-check-input"
        name="toggle"
        id="toggle"
        type="checkbox"
      />
      <label htmlFor="toggle" className="ms-2" style={{ cursor: "pointer" }}>
        <small>
          {showPassword ? (
            <span>Hide Password</span>
          ) : (
            <span>Show Password</span>
          )}
        </small>
      </label>
    </div>
  );
};

export default TogglePassword;
