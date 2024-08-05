import { useSelector } from "react-redux";
import { userSelector } from "../../redux/reducers/user_reducer";

export default function Photos() {
  const { userTimeline } = useSelector(userSelector);

  return (
    <section className="photos">
      <h2>Photos</h2>
      <div>
        {userTimeline.map((post) => {
          if (post.url) {
            return <div style={{ backgroundImage: `url(${post.url})` }} key={post._id}></div>;
          }
        })}
      </div>
    </section>
  );
}
