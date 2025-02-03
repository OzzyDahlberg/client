import { useDispatch, useSelector } from "react-redux";
import { clearUser } from "../store/user.slice";

const Home = () => {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  console.log(user);

  const handleLogout = () => {
    dispatch(clearUser());
  };

  return (
    <div>
      <h1>Home</h1>
      {user && <button onClick={handleLogout}>Logout</button>}
    </div>
  );
};

export default Home;
