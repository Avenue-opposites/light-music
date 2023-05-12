import { defineStore } from "pinia";
import { reactive } from "vue";
import { SongDetailData, Song } from "@/types";

type Player = {
  songDetails: SongDetailData["songs"];
  songs: Song[];
};

const usePlayer = defineStore("player", () => {
  const playerData = reactive<Player>({
    songDetails: [],
    songs: [],
  });
  return {
    playerData,
  };
});

export default usePlayer;
