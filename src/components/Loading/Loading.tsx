import "./Loading.css";

interface LoadingProps {
  className: "bar" | "inverted-bar";
}

const Loading = ({ className }: LoadingProps) => {
  return (
    <div className="middle" aria-label="loading">
      <div className={`${className} bar1`}></div>
      <div className={`${className} bar2`}></div>
      <div className={`${className} bar3`}></div>
      <div className={`${className} bar4`}></div>
      <div className={`${className} bar5`}></div>
      <div className={`${className} bar6`}></div>
      <div className={`${className} bar7`}></div>
      <div className={`${className} bar8`}></div>
    </div>
  );
};

export default Loading;
