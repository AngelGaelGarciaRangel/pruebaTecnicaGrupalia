import { useInfiniteQuery } from "react-query";
import { useCallback, useEffect } from "react";
import { getImages } from "../../services/imagesService"

function useImagesInfiniteScroll() {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
  } = useInfiniteQuery(
    "images",
    ({ pageParam = 1 }) => getImages(pageParam),
    {
      getNextPageParam: (lastPage, allPages) => {
        return lastPage.length === 12 ? allPages.length + 1 : undefined;
      },
    }
  );

  const loadMore = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 500) {
        loadMore();
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [loadMore]);

  return {
    data,
    isLoading,
    isFetchingNextPage,
    loadMore,
  };
}

export default useImagesInfiniteScroll;
