const Input = ({ type, placeholder, value, onChange,className }) => {
  return <input type={type} className={className} placeholder={placeholder} value={value} onChange={onChange} />;
};

export default Input;
