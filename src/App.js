import "./App.css";
import { useSelector, useDispatch } from "react-redux";
import {
  getPhotos,
  decrement,
  increment,
  getPhotosBasedOnPages,
} from "./GalleryState";
import { useEffect } from "react";

function App() {
  const dispatch = useDispatch();
  const photos = useSelector((state) => state.gallery.photos);
  const num = useSelector((state) => state.gallery.pages);

  const handleIncrement = () => {
    dispatch(increment());
    dispatch(getPhotosBasedOnPages());
  };

  const handleDecrement = () => {
    dispatch(decrement());
    dispatch(getPhotosBasedOnPages());
  };

  useEffect(() => {
    dispatch(getPhotos());
  }, [dispatch]);
  console.log(photos);
  return (
    <div className="App">
      <h1>Photo Gallery</h1>
      <button onClick={handleIncrement}>next page</button>
      <button onClick={handleDecrement}>previous page</button>
      <p> page number {num}</p>
      <hr />
      <div>
        {photos.map((photo) => (
          <img
            key={photo.id}
            alt={photo.author}
            src={photo.download_url}
            width="400"
            height="400"
          />
        ))}
      </div>
      <button onClick={handleIncrement}>next page</button>
      <button onClick={handleDecrement}>previous page</button>
      <p> page number {num}</p>
    </div>
  );
}

export default App;
