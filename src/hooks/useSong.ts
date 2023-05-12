import getCheckMusic from "@/api/checkMusic";
import getSongUrl from "@/api/songUrl";
import getSongDetail from "@/api/songDetail";
import { SOUND_QUALITY } from "@/types";
export default async function useSong(
  targetId: number | number[],
  level: SOUND_QUALITY
) {
  if (Array.isArray(targetId)) {
    targetId = targetId.filter(async (id) => {
      const { data } = await getCheckMusic(id);
      return data.success;
    });
  }
  const songDetail = await getSongDetail(targetId);
  const songURL = await getSongUrl(targetId, level);
  return {
    songDetail,
    songURL,
  };
}
