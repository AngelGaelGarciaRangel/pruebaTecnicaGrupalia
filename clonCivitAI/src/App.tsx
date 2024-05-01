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
  height: number;
}

//Function to create the Masonry Layout (images of different heights)
function createMasonryLayout(images: Image[], columnCount: number): Image[][] {
  const columns: Image[][] = Array.from({ length: columnCount }, () => []);
  images.forEach((image) => {
      const shortestColumnIndex = columns.reduce((shortestIndex, column, index) => {
          const currentHeight = column.reduce((sum, img) => sum + img.height, 0);
          const shortestHeight = columns[shortestIndex].reduce((sum, img) => sum + img.height, 0);
          return currentHeight < shortestHeight ? index : shortestIndex;
      }, 0);
      columns[shortestColumnIndex].push(image);
  });

  return columns;
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

  const columnCount = 4; 
  const columns = createMasonryLayout(images, columnCount);

  return (
        <div className="container mx-auto px-4">
            <h1 className='text-center'>CivitAI Clone</h1>
            <p>This page is a clone of the existing <a href="https://civitai.com/">CivitAI webpage</a>, a page dedicated to share cool AI images created by his community. I am using his public <a href="https://github.com/civitai/civitai/wiki/REST-API-Reference">API</a>, to make a technical assesment for Grupalia. (Hi Grupalia Team👋) </p>
            <div className="flex space-x-4">
                {columns.map((column, index) => (
                    <div key={index} className="flex-1">
                        {column.map((image) => (
                            <Image {...image}/>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default App
