import React from "react";
import { Image} from "./Image";
import {Image as ImageProps} from "../../Types/ImageType"


interface MasonryGridProps {
  images: ImageProps[];
  columnCount: number;
}

const MasonryGrid: React.FC<MasonryGridProps> = ({ images, columnCount }) => {
  // Function to create the Masonry Layout (images of different heights)
  function createMasonryLayout(images: ImageProps[], columnCount: number): ImageProps[][] {
    const columns: ImageProps[][] = Array.from({ length: columnCount }, () => []);
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
            <Image key={image.id} {...image} />
          ))}
        </div>
      ))}
    </div>
  );
};

export default MasonryGrid;
