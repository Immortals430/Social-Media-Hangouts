import { useSelector } from "react-redux";
import { userSelector } from "../../redux/reducers/user_reducer";
import "./profile.scss"

export default function Photos({activeComp}) {
  const { userTimeline } = useSelector(userSelector);

  return (
    <section className={`photos ${activeComp == "photos" ? "active" : null}`}>
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
