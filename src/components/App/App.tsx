import HomePage from "../../pages/HomePage";
import Header from "../Header/Header";
import "./App.css";

const App = (): React.ReactElement => {
  return (
    <div className="container">
      <Header />
      <HomePage />
    </div>
  );
};

export default App;
