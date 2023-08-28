import { useEffect, useLayoutEffect, useState } from "react";
import axios from "axios";
import Cards from "./Cards";
import { Tracks } from "@/types";

interface ProfileProps {
  accessToken: string;
}

const Profile: React.FC<ProfileProps> = ({ accessToken }) => {
  const token = accessToken;
  const [data, setData] = useState<any>({});
  const [isLoading, setIsLoading] = useState(true);

  const ProfilelyListened = async () => {
    await axios
      .get("https://api.spotify.com/v1/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setData(res.data);
        console.log(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    ProfilelyListened();
  }, []);

  return (
    <div className="text-white p-5">
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div className="justify-center flex">
          <div className="flex mt-5 items-center gap-x-3">
            <img className="w-16 h-16 rounded-full" src={data.images[1].url} />
            <div className="text-2xl">{data.display_name}</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
