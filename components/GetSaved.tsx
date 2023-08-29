import { useEffect, useLayoutEffect, useState } from "react";
import axios from "axios";
import Cards from "./Cards";
import { Tracks } from "@/types";

interface GetSavedProps {
  accessToken: string;
}


const GetSaved: React.FC<GetSavedProps> = ({ accessToken }) => {
  const token = accessToken;
  const [data, setData] = useState([{}]);
  const [isLoading, setIsLoading] = useState(true);

  const GetSavedlyListened = async () => {
    await axios.post
    await axios
      .get(
        `https://api.spotify.com/v1/me/tracks`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        // setData(res.data);
        console.log(res.data.items);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });

      
  };

  useEffect(() => {
    GetSavedlyListened();
  }, []);

  return (
    <div className="text-white p-5">

      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <>
          {/* {data.map((item) => (
            <div className="flex mt-5">
              <Cards track={item} />
            </div>
          ))} */}

        </>
      )}
    </div>
  );
};

export default GetSaved;
