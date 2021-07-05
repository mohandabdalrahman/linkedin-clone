import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../../../features/userSlice';
import { auth } from '../../firebase';
import './Login.css';

const Login = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [photo, setPhoto] = useState('');
  const dispatch = useDispatch();

  const loginApp = (e) => {
    e.preventDefault();
    auth.signInWithEmailAndPassword(email, password).then((userAuth) => {
      dispatch(login({
        email: userAuth.user.email,
        uid: userAuth.user.uid,
        displayName: userAuth.user.name,
        photoURL: userAuth.user.photoURL
      }));
    }).catch((error) => alert(error));
  };

  const register = () => {
    auth.createUserWithEmailAndPassword(email, password).then((userAuth) => {
      userAuth.user.updateProfile({
        displayName: name,
        photoURL: photo
      }).then(() => {
        dispatch(login({
          email: userAuth.user.email,
          uid: userAuth.user.uid,
          displayName: name,
          photoURL: photo
        }));
      });;
    }).catch(err => alert(err));
  };

  return (
    <div className="login">
      <img src="https://cdn.worldvectorlogo.com/logos/linkedin.svg" alt="linkedIn" />
      <form onSubmit={loginApp}>
        <input type="text" placeholder="Full name (if register) " onChange={e => setName(e.target.value)} value={name} />
        <input type="text" placeholder="Profile picture (optional)" onChange={e => setPhoto(e.target.value)} value={photo} />
        <input type="email" placeholder="Email" onChange={e => setEmail(e.target.value)} value={email} />
        <input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} value={password} />
        <button>Sign in</button>
      </form>
      <p>Not a member <span onClick={register} className="login__register">Register Now</span></p>
    </div>
  );
};

export default Login;
