import Header from "../components/layout/Header";
import MenuBar from "../components/layout/MenuBar";
import Routine from "../pages/Routine";

function TestH() {
  return (
    <div>
      <Header />
      <div className="flex">
        <MenuBar />
        <Routine />
      </div>
    </div>
  );
}
export default TestH;
