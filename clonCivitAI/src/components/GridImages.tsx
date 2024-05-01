import useImagesInfiniteScroll from "../hooks/useImagesInfiniteScroll";
import LoadingSpinner from "../components/LoadingSpinner";
import MasonryGrid from "../components/MasonryGrid";

function GridImages() {
  const { data, isLoading, isFetchingNextPage } = useImagesInfiniteScroll();

  const images = data?.pages.flat() || [];
  const columnCount = 4;

  return (
    <div className="container mx-auto px-4">
      {/* Conditional rendering for initial loading */}
      {isLoading ? (
        <LoadingSpinner />
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
          <MasonryGrid images={images} columnCount={columnCount} />
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

export default GridImages;
