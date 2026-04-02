const Select = ({ label, options, value, onChange }) => {
  const selectId = label.toLowerCase().replace(/\s+/g, "-");

  return (
    <label htmlFor={selectId}>
      <span>{label}</span>
      <select
        id={selectId}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="">All</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
};

export default Select;
