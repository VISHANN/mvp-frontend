import styles from "./index.module.css";
import UserProfile from "@/components/UserProfile";
import { useContext } from "react";
import { UserContext } from "@/app/context";

export default function Review({ review }) {
  const [user] = useContext(UserContext);
  console.log(user);

  return (
    <div className={styles.gridWrap}>
      <div className={styles.left}>
        <UserProfile src={user.picture} />
      </div>
      <div className={styles.right}>
        <div>
          <span>{user.given_name}</span>
          <span> • </span>
          <span>{"thumbs up icon"}</span>
        </div>
        <div>
          <p>{review.text}</p>
        </div>
        <div>
          <span className={styles.time}>
            {Date(review.createdAt).substring(4, 15)}
          </span>
        </div>
      </div>
    </div>
  );
}
