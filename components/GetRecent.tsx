import { useEffect, useLayoutEffect, useState } from "react";
import axios from "axios";
import Cards from "./Cards";
import { Tracks } from "@/types";

interface GetRecentProps {
  accessToken: string;
}


export let trackID = new Array(5);

const GetRecent: React.FC<GetRecentProps> = ({ accessToken }) => {
  const token = accessToken;
  const [data, setData] = useState([{}]);
  const [isLoading, setIsLoading] = useState(true);

  const getRecentlyListened = async () => {
    await axios
      .get(
        "https://api.spotify.com/v1/me/top/tracks?time_range=short_term&limit=5",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        setData(res.data.items);
        console.log(res.data.items);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });

      
  };

  useEffect(() => {
    getRecentlyListened();
  }, []);

  const fillArray = () => {
    trackID = data.map((track: any) => track.id)
  }

  return (
    <div className="text-white p-5">
      <h2 className="text-xl capitalize font-semibold">top tracks this month</h2>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <>
          {data.map((item) => (
            <div className="flex mt-5">
              <Cards track={item} />
            </div>
          ))}

          {fillArray()}
        </>
      )}
    </div>
  );
};

export default GetRecent;
