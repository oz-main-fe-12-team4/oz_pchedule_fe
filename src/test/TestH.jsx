import { posts } from "../assets/data/dummyPostList";
import RoutineCard from "../components/RoutineCard";

function TestH() {
  return (
    <div>
      {posts.data.map((el) => (
        <RoutineCard key={el.post_id} post={el} />
      ))}
    </div>
  );
}
export default TestH;
