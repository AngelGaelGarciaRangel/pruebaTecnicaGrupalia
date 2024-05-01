import './App.css'
import {getImages} from "../services/imagesService.tsx";
import { useState, useEffect } from 'react';
import { Image } from './components/Image.tsx';

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
              <Image {...image}/>
            </div>
        ))}
    </div>
);
}

export default App
