"use client";

import { BiHeart, BiSolidHeart } from "react-icons/bi";

import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import axios from "axios";

interface SaveButtonProps {
  trackId: string;
  token: string;
}

const SaveButton: React.FC<SaveButtonProps> = ({ trackId, token }) => {
  const router = useRouter();

  const [isLiked, setIsLiked] = useState(false);

  const handleLike = async () => {
    if (!isLiked) {

        await axios({
          method: "put",
          url: `https://api.spotify.com/v1/me/tracks?ids=${trackId}`,
          headers: { Authorization: `Bearer ${token}` },
        })
          .then(() => {
            setIsLiked(true)
            toast.success("Added to liked songs");
          })
          .catch((error) => toast.error("Error occured"));

    }
    else{
      await axios({
        method: "delete",
        url: `https://api.spotify.com/v1/me/tracks?ids=${trackId}`,
        headers: { Authorization: `Bearer ${token}` },
      })
        .then(() => {
          setIsLiked(false)
          toast.success("Removed from liked songs");
        })
        .catch((error) => toast.error("Error occured"));
    }
    //     .post(`https://api.spotify.com/v1/me/tracks?ids=0oj2GxdRBcNAnMouNndu8J`, {
    //       headers: {
    //         Authorization: `Bearer ${token}`,
    //         "Content-Type": "application/json",
    //       },
    //     })
    //     .then(() => {
    //         console.log("AKFJDSS");
    //       setIsLiked(true);
    //       toast.success("Added to Liked Songs");
    //     })
    //     .catch((err) => {
    //       console.log(err);
    //     });
    // }

    router.refresh();
  };

  const Icon = isLiked ? BiSolidHeart : BiHeart;

  return (
    <button
      className="text-neutral-500 hover:text-white cursor-pointer"
      onClick={handleLike}
    >
      <Icon className={ (isLiked ? "text-green-500" : "text-neutral-500")} size={20} />
    </button>
  );
};

export default SaveButton;
