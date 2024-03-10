import { mdiMusicNote } from "@mdi/js";
import Icon from "@mdi/react";
import React, { useContext, useState } from "react";
import { IconButton, Sheet, Stack, Typography } from "@mui/joy";
import SongModel from "../../models/SongModel";
import { useSongContext } from "../../context/SongContext";
import { HistoryContext } from "../../context/HistoryContext";
import Cookies from "universal-cookie";

interface FeedSongItemProps {
  song?: SongModel;
}

const FeedSongItem = ({ song }: FeedSongItemProps) => {
  const { service } = useContext(HistoryContext);
  const { setSelectedSong } = useSongContext();
  const cookies = new Cookies();

  const handleClick = () => {
    if (song) {
      setSelectedSong(song);
      service.createHistory(
        { user_id: cookies.get("userId").toString(), song_id: song.id },
        cookies.get("userId").toString(),
      );
    }
  };

  return (
    <>
      <Stack
        direction={"row"}
        alignItems={"center"}
        justifyContent={"space-between"}
        sx={{
          background: "#262626a8",
          height: "100%",
          width: 200,
          p: 2,
          borderRadius: 8,
          border: "2px solid #5a039d",
        }}
        onClick={handleClick}
        data-cy="song"
      >
        <Stack direction={"row"}>
          <Sheet sx={{ p: 1, mr: 1, background: "#ffffff00" }}>
            {song ? (
              <IconButton onClick={() => setSelectedSong(song)}>
                <Icon path={mdiMusicNote} size={1} color="white" />
              </IconButton>
            ) : null}
          </Sheet>
          <Stack>
            <Typography level="body-sm">{song?.artist}</Typography>
            <Typography level="title-md">{song?.title}</Typography>
          </Stack>
        </Stack>
      </Stack>
    </>
  );
};

export default FeedSongItem;
