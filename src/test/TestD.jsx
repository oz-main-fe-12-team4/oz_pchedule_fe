import CalenderModal from "../components/CalendarModal";
import Header from "../components/Header";
import MenuBar from "../components/MenuBar";

function TestD() {
  return (
    <div>
      <Header />
      <div className="flex">
        <MenuBar />
        <CalenderModal />
      </div>
    </div>
  );
}

export default TestD;
