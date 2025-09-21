import Header from "../components/Header";
import MenuBar from "../components/MenuBar";
import Someday from "../pages/Someday";

function TestD() {
  return (
    <div>
      <Header />
      <div className="flex">
        <MenuBar />
        <Someday />
      </div>
    </div>
  );
}

export default TestD;
