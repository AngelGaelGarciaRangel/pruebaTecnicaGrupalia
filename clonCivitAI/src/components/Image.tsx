import { FC, useState } from "react";
import { DropdownMenu } from "./DropdownMenu"; // Import the DropdownMenu component
import {Image as ImageProps} from "../../Types/ImageType"


const Image: FC<ImageProps> = (imageData) => {
    const [canSee, setCanSee] = useState(imageData.canSee);

    // Function to toggle the canSee state
    const handleChangeCanSee = () => {
        setCanSee(prevCanSee => !prevCanSee);
    };

    const parentDivClass = imageData.nsfw
        ? "bg-white rounded-lg shadow-lg p-2 pb-4 m-4 relative blur-shadow"
        : "bg-white rounded-lg shadow-lg p-2 pb-4 m-4 relative";

    return (
        <div className={parentDivClass}>
            {/* Dropdown Menu */}
            <div className="absolute top-1 right-1 z-10 bg-transparent">
                <DropdownMenu handleCanSee={handleChangeCanSee} {...imageData} />
            </div>
            {/* Image container */}
            <div
                style={{
                    width: `${imageData.width}px`,
                    height: `${imageData.height}px`,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}
                className="bg-[#CED5FF] rounded-lg shadow-lg mx-auto relative"
            >
                {canSee ? (
                    /* Image */
                    <img
                        src={imageData.url}
                        alt={`Image ${imageData.id}`}
                        className="rounded-lg"
                        style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                        }}
                    />
                ) : (
                    /* Blue div with block emoji */
                    <div className="bg-[#4169e1] w-full h-full flex justify-center items-center rounded-lg">
                        <span role="img" aria-label="block" className="text-2xl">🚫</span>
                    </div>
                )}
            </div>

            {/* Stats section */}
            <div className="grid grid-cols-2 gap-2 mt-2">
                {/* Like button */}
                <div className="flex items-center justify-center bg-[#CED5FF] rounded-md p-1 text-[#2118FF]">
                    <span role="img" aria-label="like" className="text-lg">👍</span>
                    <span className="ml-1 font-medium">{imageData.likeCount}</span>
                </div>
                {/* Heart button */}
                <div className="flex items-center justify-center bg-[#CED5FF] rounded-md p-1 text-[#2118FF]">
                    <span role="img" aria-label="heart" className="text-lg">❤️</span>
                    <span className="ml-1 font-medium">{imageData.heartCount}</span>
                </div>
                {/* Laugh button */}
                <div className="flex items-center justify-center bg-[#CED5FF] rounded-md p-1 text-[#2118FF]">
                    <span role="img" aria-label="laugh" className="text-lg">😂</span>
                    <span className="ml-1 font-medium">{imageData.laughCount}</span>
                </div>
                {/* Cry button */}
                <div className="flex items-center justify-center bg-[#CED5FF] rounded-md p-1 text-[#2118FF]">
                    <span role="img" aria-label="cry" className="text-lg">😢</span>
                    <span className="ml-1 font-medium">{imageData.cryCount}</span>
                </div>
            </div>
        </div>
    );
};

export { Image };
