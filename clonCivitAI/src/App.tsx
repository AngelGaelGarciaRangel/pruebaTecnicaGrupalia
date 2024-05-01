import "./App.css";
import { getImages } from "../services/imagesService.tsx";
import { useState, useEffect } from "react";
import { Image } from "./components/Image.tsx";

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
    const shortestColumnIndex = columns.reduce(
      (shortestIndex, column, index) => {
        const currentHeight = column.reduce((sum, img) => sum + img.height, 0);
        const shortestHeight = columns[shortestIndex].reduce(
          (sum, img) => sum + img.height,
          0
        );
        return currentHeight < shortestHeight ? index : shortestIndex;
      },
      0
    );
    columns[shortestColumnIndex].push(image);
  });

  return columns;
}

function App() {
  const [images, setImages] = useState<Image[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    const imagesFetch = async () => {
      setLoading(true);
      const imagesData = await getImages();
      setImages(imagesData);
      setLoading(false);
    };
    imagesFetch();
  }, []);

  const columnCount = 4;
  const columns = createMasonryLayout(images, columnCount);

  return (
    <div className="container mx-auto px-4">
      {loading ? (
        <div className="flex flex-col items-center justify-center h-64">
          <div className="text-3xl animate-spin">⏳</div>
          <p className="font-medium mt-2">Please wait</p>
          <p className="font-bold">Loading images...</p>
        </div>
      ) : (
        <div>
          <h1 className="text-center">CivitAI Clone</h1>
          <p>
            This page is a clone of the existing{" "}
            <a href="https://civitai.com/">CivitAI webpage</a>, a page dedicated
            to sharing cool AI images created by its community. I am using its
            public{" "}
            <a href="https://github.com/civitai/civitai/wiki/REST-API-Reference">
              API
            </a>{" "}
            to make a technical assessment for Grupalia. (Hi Grupalia Team👋)
          </p>
          <div className="flex space-x-4">
            {columns.map((column, index) => (
              <div key={index} className="flex-1">
                {column.map((image) => (
                  <Image key={image.id} {...image} />
                ))}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
