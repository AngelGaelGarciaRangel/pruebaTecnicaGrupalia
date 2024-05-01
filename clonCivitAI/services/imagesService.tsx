import axios from "axios";

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

const getImages = async (pageParam: number): Promise<Image[]> => {
  try {
    const answer = await axios.get(`https://civitai.com/api/v1/images?limit=12&page=${pageParam}`);
    const items = answer.data.items;
    const images: Image[] = items.map((item: any) => ({
      id: item.id,
      url: item.url,
      hash: item.hash,
      nsfw: item.nsfw,
      cryCount: item.stats.cryCount,
      laughCount: item.stats.laughCount,
      likeCount: item.stats.likeCount,
      heartCount: item.stats.heartCount,
      commentCount: item.stats.commentCount,
      dislikeCount: item.stats.dislikeCount,
      height: 200,
    }));
    return images;
  } catch (error) {
    console.log("Error fetching images", error);
    return [];
  }
};

export { getImages };
