import Header from "../components/Header";
import MenuBar from "../components/MenuBar";
import PlusButton from "../components/PlusButton";
import DailyPage from "../pages/DailyPage";
import { posts } from "../assets/data/dummyPostList";

function TestD() {
  return (
    <div>
      <Header />
      <div className="flex">
        <MenuBar />
        <DailyPage posts={posts} />
      </div>
    </div>
  );
}
export default TestD;
