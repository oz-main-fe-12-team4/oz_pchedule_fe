import Header from "../components/Header";
import MenuBar from "../components/MenuBar";
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
