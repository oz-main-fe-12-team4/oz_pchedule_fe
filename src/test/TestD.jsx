import Header from "../components/Header";
import MenuBar from "../components/MenuBar";
import PlusButton from "../components/PlusButton";

function TestD() {
  return (
    <div>
      <Header />
      <div className="flex">
        <MenuBar />
        <PlusButton />
      </div>
    </div>
  );
}
export default TestD;
