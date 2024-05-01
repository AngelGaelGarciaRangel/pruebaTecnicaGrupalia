import { FC, useState } from "react";

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
    canSee: boolean;
}

interface DropdownMenuProps extends ImageProps {
    handleCanSee: () => void;
}

const DropdownMenu: FC<DropdownMenuProps> = (props) => {
    const { handleCanSee, ...imageData } = props;
    const [isDropdownOpen, setDropdownOpen] = useState(false);
    const [copyText, setCopyText] = useState("Copy URL");

    const toggleDropdown = () => {
        setDropdownOpen(!isDropdownOpen);
    };

    // Function to handle image download
    const handleDownload = async () => {
        try {
            // Fetch the image data as a blob
            const response = await fetch(imageData.url);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const blob = await response.blob();
            const url = URL.createObjectURL(blob);
            const anchor = document.createElement('a');
            anchor.href = url;
            anchor.download = `image-${imageData.id}.jpg`; // Set the download filename
            document.body.appendChild(anchor);
            anchor.click();
            document.body.removeChild(anchor);
            // Revoke the blob URL to release memory
            URL.revokeObjectURL(url);
        } catch (error) {
            console.error('Failed to download image:', error);
        }
    };

    // Function to toggle canSee field
    const handleToggleCanSee = () => {
        handleCanSee();
    };

    // Function to handle copying the prompt to the clipboard
    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(imageData.url);
            setCopyText("Copied 👍");
        } catch (error) {
            console.error("Failed to copy text:", error);
        }
    };

    return (
        <div className="relative">
            <button onClick={toggleDropdown} className="absolute top-0 right-0 m-2 bg-transparent">
                <span className="text-2xl shadow-2xl">⋮</span>
            </button>

            {/* Dropdown menu */}
            {isDropdownOpen && (
                <div className="absolute top-9 right-0 mt-6 w-32 shadow-lg">
                    {/* Download button */}
                    <button
                        onClick={handleDownload}
                        className="block w-full text-left px-4 py-2 bg-[#4169e1] hover:bg-[#3957d7] rounded-t-md  rounded-b-none text-white"
                    >
                        Download
                    </button>
                    {/* Hide button */}
                    <button
                        onClick={handleToggleCanSee}
                        className={`block w-full text-left px-4 py-2 bg-[#4169e1] hover:bg-[#3957d7] rounded-none text-white`}
                    >
                        {imageData.canSee ? 'Hide' : 'Show'}
                    </button>
                    {/* Copy button */}
                    <button
                        onClick={handleCopy}
                        className="block w-full text-left px-4 py-2 bg-[#4169e1] hover:bg-[#3957d7] rounded-t-none rounded-b-md text-white"
                    >
                        {copyText}
                    </button>
                </div>
            )}
        </div>
    );
};

export { DropdownMenu };
