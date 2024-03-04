import { Stack } from "@mui/joy";
import { useContext, useEffect } from "react";
import PlaylistItem from "../../../../shared/components/PlaylistItem"; // Importando o componente PlaylistItem
import PlaylistHeader from "../../components/UserPlaylistsOptions"; // Importando o componente PlaylistHeader
import { PlaylistContext } from "../../context/PlaylistContext";
import styles from "./index.module.css";

/**
 * Renders a list of playlists.
 */
const PlaylistPage = () => {
  const { service, state } = useContext(PlaylistContext);

  useEffect(() => {
    service.getUserPlaylists("1");
  }, [service]);

  return (
    <Stack
      direction="column"
      justifyContent="center"
      alignItems="stretch"
      spacing={2}
      className={styles.container}
    >
      <PlaylistHeader />
      <div className={styles.listContainer}>
        {state.getUserPlaylistsRequestStatus.maybeMap({
          loading: () => <span>Carregando...</span>,
          failed: (states) => (
            <span>Erro ao carregar as playlists! {states.message} </span>
          ),
          succeeded: (playlists) => (
            <>
              {playlists.length > 0 ? (
                playlists.map((playlist) => {
                  return (
                    <div key={playlist.playlist_id} className={styles.listItem}>
                      <PlaylistItem playlist={playlist} />
                    </div>
                  );
                })
              ) : (
                <span>Nenhuma playlist encontrada!</span>
              )}
            </>
          ),
        })}
      </div>
    </Stack>
  );
};

export default PlaylistPage;
