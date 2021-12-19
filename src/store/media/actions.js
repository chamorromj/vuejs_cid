import MediaService from "src/services/Media/media.service";

export async function addFavorites({ commit }, favorites) {
  commit("setFavorites", favorites);
}

export async function addFavorite({ commit }, favorite) {
  const mediaService = new MediaService();
  await mediaService.addToFavorites(favorite);
  commit("addNewFavorite", favorite);
}
