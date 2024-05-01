import React from "react";
import { Image as ImageComponent } from "./Image";

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

interface MasonryGridProps {
  images: Image[];
  columnCount: number;
}

const MasonryGrid: React.FC<MasonryGridProps> = ({ images, columnCount }) => {
  // Function to create the Masonry Layout (images of different heights)
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

  const columns = createMasonryLayout(images, columnCount);

  return (
    <div className="flex space-x-4">
      {columns.map((column, index) => (
        <div key={index} className="flex-1">
          {column.map((image) => (
            <ImageComponent key={image.id} {...image} />
          ))}
        </div>
      ))}
    </div>
  );
};

export default MasonryGrid;
