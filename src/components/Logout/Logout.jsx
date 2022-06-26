import Button from 'react-bootstrap/Button';
import { useSelector } from 'react-redux';
import logoutSound from 'assets/logout-sound.mp3';
import authOperations from 'Redux/auth/auth-operations';
import { FaUserTie } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import authSelectors from 'Redux/auth/auth-selectors';
function Logout() {
  const user = useSelector(authSelectors.getUsername);
  const audio = new Audio(logoutSound);
  const dispatch = useDispatch();
  const startPlaying = () => {
    audio.play();
  };
  return (
    <div className="d-flex justify-content-center align-items-center  ">
      <FaUserTie color={'white'} size={25} style={{ marginRight: '10px' }} />
      <p className="text-white mb-0 me-3 ">Hello, {user}</p>
      <Button
        onClick={() => {
          dispatch(authOperations.logOut());
          startPlaying();
        }}
        variant="secondary"
      >
        Logout
      </Button>
    </div>
  );
}

export default Logout;
