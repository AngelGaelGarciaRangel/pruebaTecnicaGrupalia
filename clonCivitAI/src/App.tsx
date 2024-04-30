import './App.css'
import {getImages} from "../services/imagesService.ts";
import { useState, useEffect } from 'react';

interface Image {
  id: number;
  url: string;
  hash: string;
  nsfw: boolean;
  cryCount: number;
  laughCount: number;
  likeCount: number;
  heartCount: number;
  commentCount: number;
  dislikeCount: number;
}

function App() {
  const [images, setImages] = useState<Image[]>([]);
  useEffect(() => {
    const imagesFetch =  async () => {
      const imagesData = await getImages();
      setImages(imagesData);
    };
    imagesFetch();
  },[]);
  return (
    <div>
        {images.map(image => (
            <div key={image.id}>
                <img src={image.url} alt={image.hash} />
            </div>
        ))}
    </div>
);
}

export default App
