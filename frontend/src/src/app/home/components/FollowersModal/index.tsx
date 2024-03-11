import { Modal, ModalClose, Sheet, Typography } from "@mui/joy";
import PlaylistModel from "../../models/PlaylistModel";
import UserModel from "../../models/UserModel";
import { useContext, useEffect, useState } from "react";
import { PlaylistContext } from "../../context/PlaylistContext";

interface FollowersModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  playlist: PlaylistModel;
}

const FollowerItem = ({ follower }: { follower: UserModel }) => {
  return (
    <Typography sx={{ mb: 1 }} data-cy="follower-modal">
      {follower.name}
    </Typography>
  );
};

const FollowersModal = (props: FollowersModalProps) => {
  const { open, setOpen, playlist } = props;
  const { service } = useContext(PlaylistContext);
  const [followersData, setFollowersData] = useState<UserModel[]>([]);

  const fetchFollowersData = async () => {
    if (open) {
      try {
        const followers = await service.getUserArray(playlist.followers);
        setFollowersData(followers);
      } catch (error) {
        console.error("Error fetching followers:", error);
        setFollowersData([]); // Reset followers data on error
      }
    }
  };

  useEffect(() => {
    fetchFollowersData();
  }, [open, playlist.followers, service]);

  return (
    <Modal
      aria-labelledby="modal-title"
      aria-describedby="modal-desc"
      open={open}
      onClose={() => setOpen(false)}
      sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
    >
      <Sheet
        variant="outlined"
        sx={{
          maxWidth: 500,
          minWidth: 400,
          borderRadius: "md",
          p: 3,
          boxShadow: "lg",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <ModalClose variant="plain" sx={{ m: 1 }} />
        <Typography
          component="h2"
          id="modal-title"
          level="h3"
          textColor="inherit"
          fontWeight="lg"
          mb={4}
          sx={{ display: "flex", justifyContent: "center" }}
        >
          Followers:
        </Typography>

        {followersData.map((follower, index) => (
          <FollowerItem key={index} follower={follower} />
        ))}
      </Sheet>
    </Modal>
  );
};

export default FollowersModal;
