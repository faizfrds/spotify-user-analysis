import { useEffect, useLayoutEffect, useState } from "react";
import axios from "axios";
import Cards from "./Cards";
import { Tracks } from "@/types";

interface GetRecentProps {
  accessToken: string;
  timeRange: string;
}


export let trackID = new Array(5);

const GetRecent: React.FC<GetRecentProps> = ({ accessToken, timeRange }) => {
  const token = accessToken;
  console.log(timeRange)
  const [data, setData] = useState([{}]);
  const [isLoading, setIsLoading] = useState(true);

  const getRecentlyListened = async () => {
    await axios
      .get(
        `https://api.spotify.com/v1/me/top/tracks?time_range=${timeRange}&limit=5`,
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
    <div className="text-white p-5 w-full">

      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <>
          {data.map((item, index) => (
            <div className="flex mt-5 w-full">
              <Cards track={item} index={index + 1}/>
            </div>
          ))}

          {fillArray()}
        </>
      )}
    </div>
  );
};

export default GetRecent;
