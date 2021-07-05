import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import Feed from './app/components/Feed/Feed';
import Header from './app/components/Header/Header';
import Login from './app/components/Login/Login';
import Sidebar from './app/components/Sidebar/Sidebar';
import Widgets from './app/components/widgets/Widgets';
import { auth } from './app/firebase';
import { logout, selectUser, login } from './features/userSlice';

function App() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  useEffect(() => {
    auth.onAuthStateChanged((userAuth) => {
      if (userAuth) {
        dispatch(login({
          email: userAuth.email,
          uid: userAuth.uid,
          displayName: userAuth.displayName,
          photoURL: userAuth.photoURL
        }));

      } else {
        dispatch(logout());
      }

    });
  }, [dispatch]);
  return (
    <div className="app">
      <Header />
      {!user ? <Login /> : (
        <div className="app__body">
          <Sidebar />
          <Feed />
          <Widgets />
        </div>
      )}

    </div>
  );
}

export default App;
