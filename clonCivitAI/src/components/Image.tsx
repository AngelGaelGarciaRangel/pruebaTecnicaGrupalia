import { FC } from "react";

interface ImageProps {
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
  width: number;
  height: number;
}

const Image: FC<ImageProps> = (imageData) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-2 pb-4 m-4">
      <div
        style={{
          width: `${imageData.width}px`,
          height: `${imageData.height}px`,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
        className="bg-[#CED5FF] rounded-lg shadow-lg mx-auto" 
      >
        <img
          src={imageData.url}
          alt={`Image ${imageData.id}`}
          className="rounded-lg"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />
      </div>

      <div className="grid grid-cols-2 gap-2 mt-2">
        {/* Like button */}
        <div className="flex items-center justify-center bg-[#CED5FF] rounded-md p-1 text-[#2118FF]">
          <span role="img" aria-label="like" className="text-lg">
            👍
          </span>
          <span className="ml-1 font-medium">{imageData.likeCount}</span>
        </div>
        {/* Heart button */}
        <div className="flex items-center justify-center bg-[#CED5FF] rounded-md p-1 text-[#2118FF]">
          <span role="img" aria-label="heart" className="text-lg">
            ❤️
          </span>
          <span className="ml-1 font-medium">{imageData.heartCount}</span>
        </div>
        {/* Laugh button */}
        <div className="flex items-center justify-center bg-[#CED5FF] rounded-md p-1 text-[#2118FF]">
          <span role="img" aria-label="laugh" className="text-lg">
            😂
          </span>
          <span className="ml-1 font-medium">{imageData.laughCount}</span>
        </div>
        {/* Cry button */}
        <div className="flex items-center justify-center bg-[#CED5FF] rounded-md p-1 text-[#2118FF]">
          <span role="img" aria-label="cry" className="text-lg">
            😢
          </span>
          <span className="ml-1 font-medium">{imageData.cryCount}</span>
        </div>
      </div>
    </div>
  );
};

export { Image };
