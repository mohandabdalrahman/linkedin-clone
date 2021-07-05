import { useState, useEffect } from 'react';
import './Feed.css';
import CreateIcon from '@material-ui/icons/Create';
import InputOption from '../InputOption/InputOption';
import ImageIcon from '@material-ui/icons/Image';
import SubscriptionsIcon from '@material-ui/icons/Subscriptions';
import EventNoteIcon from '@material-ui/icons/EventNote';
import CalendarViewDayIcon from '@material-ui/icons/CalendarViewDay';
import Post from '../Post/Post';
import { db } from '../../firebase';
import firebase from 'firebase';
import { useSelector } from 'react-redux';
import { selectUser } from '../../../features/userSlice';
const Feed = () => {
  const [posts, setPosts] = useState([]);
  const [message, setMessage] = useState('');
  const user = useSelector(selectUser);

  useEffect(() => {
    db.collection('posts').orderBy('timestamp', 'desc').onSnapshot(snapShot => {
      setPosts(snapShot.docs.map(doc => {
        return {
          id: doc.id,
          data: doc.data()
        };
      }));
    });
  }, []);


  const handleSubmit = (e) => {
    e.preventDefault();

    db.collection('posts').add({ name: user.displayName, description: user.email, message, photoUrl: user.photoURL || user.email[0], timestamp: firebase.firestore.FieldValue.serverTimestamp() });
    setMessage('');
  };

  return (
    <div className="feed">
      <div className="feed__feedInputContainer">
        <div className="feed__input">
          <CreateIcon />
          <form onSubmit={handleSubmit}>
            <input type="text" value={message} onChange={e => setMessage(e.target.value)} />
          </form>
        </div>
        <div className="feed__inputOptions">
          <InputOption Icon={ImageIcon} title="Photos" color="#70B5f9" />
          <InputOption Icon={SubscriptionsIcon} title="Videos" color="#e7a33e" />
          <InputOption Icon={EventNoteIcon} title="Event" color="#c0cbcd" />
          <InputOption Icon={CalendarViewDayIcon} title="Write article" color="#7fc15e" />
        </div>
      </div>
      {/* posts */}

      {posts.map(({ id, data: { name, description, message, photoUrl } }) => <Post key={id} name={name} description={description} message={message} photoUrl={photoUrl} />)}

    </div>
  );
};

export default Feed;

