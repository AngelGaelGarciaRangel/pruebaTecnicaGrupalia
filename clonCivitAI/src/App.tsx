import "./App.css";
import { getImages } from "../services/imagesService";
import { useInfiniteQuery } from "react-query";
import { useEffect, useCallback } from "react";
import { Image as ImageComponent } from "./components/Image";

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

function App() {
  const columnCount = 4;

  // useInfiniteQuery for infinite scroll effect
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useInfiniteQuery("images", ({ pageParam = 1 }) => getImages(pageParam), {
      getNextPageParam: (lastPage, allPages) => {
        return lastPage.length === 12 ? allPages.length + 1 : undefined;
      },
    });

  const images = data?.pages.flat() || [];
  const columns = createMasonryLayout(images, columnCount);

  const loadMore = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  // Scroll event listener to identify where to call the loadMore function
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >=
        document.body.offsetHeight - 500
      ) {
        loadMore();
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [loadMore]);

  return (
    <div className="container mx-auto px-4">
      {/* Conditional rendering for initial loading */}
      {isLoading ? (
        <div className="flex flex-col items-center justify-center h-64">
          <div className="text-3xl animate-spin">⏳</div>
          <p className="font-medium mt-2">Please wait</p>
          <p className="font-bold">Loading images...</p>
        </div>
      ) : (
        <>
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
                  <ImageComponent key={image.id} {...image} />
                ))}
              </div>
            ))}
          </div>

          {/* Loading message for fetching next page */}
          {isFetchingNextPage && (
            <div className="text-center">
              <div className="text-3xl animate-spin">⏳</div>
              <p className="font-bold">Loading more images...</p>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default App;
