import axios from "axios";
import {Image} from "../Types/ImageType";

const getImages = async (pageParam: number): Promise<Image[]> => {
  try {
    const response = await axios.get(`https://civitai.com/api/v1/images?limit=12&page=${pageParam}`);
    const items = response.data.items;
    const fixedWidth = 250;

    const images: Image[] = items.map((item: any) => {
      const aspectRatio = item.height / item.width;
      const newHeight = fixedWidth * aspectRatio;
      return {
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
        width: fixedWidth,
        height: newHeight,
        canSee: true,
      };
    });

    return images;
  } catch (error) {
    console.log("Error fetching images", error);
    return [];
  }
};

export { getImages };
