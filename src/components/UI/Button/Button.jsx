const Button = (props) => {
  return (
    <button
      type={props.type || "button"}
      onClick={props.onClick}
      autoFocus={props.autoFocus}
      className="w-fit px-6 py-3 mb-4 flex items-center border-2 focus:outline-neutral-900 active:outline-neutral-900 hover:border-neutral-900 rounded-md cursor-pointer duration-200 focus:scale-105 active:scale-105 hover:scale-105"
    >
      {props.children}
    </button>
  );
};
export default Button;
