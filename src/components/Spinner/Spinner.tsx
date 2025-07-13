import "./Spinner.css";

//NO es import FROM, es solo import, solamente el archivo .css

export const Spinner = () => {
  return (
    <div className="spinner">
      <div className="bounce1"></div>
      <div className="bounce2"></div>
      <div className="bounce3"></div>
    </div>
  );
};
