import "./button.css";

const Button = (props) => {
  return <div {...props} className={'button ' + props.className}/>;
};

export default Button;
