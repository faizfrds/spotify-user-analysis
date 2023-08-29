import { useEffect, useLayoutEffect, useState } from "react";
import axios from "axios";
import Cards from "./Cards";
import { trackID } from "./GetRecent";
import { BiHeart } from "react-icons/bi";
import SaveButton from "./SaveButton";

interface GetRecProps {
  accessToken: string;
}

const GetRec: React.FC<GetRecProps> = ({ accessToken }) => {
  const token = accessToken;
  const [data, setData] = useState([{}]);
  const [isLoading, setIsLoading] = useState(true);

  console.log(trackID.join(`,`));

  const GetReclyListened = async () => {

    await axios
      .get(
        `https://api.spotify.com/v1/recommendations?limit=6&seed_tracks=${trackID.join(`,`)}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        setData(res.data.tracks);
        console.log(res.data.tracks);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    GetReclyListened();
  }, []);

  return (
    <div className="text-white p-5">
      <h2 className="text-xl font-semibold capitalize mb-9">
        recommended songs for you
      </h2>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <>
          {data.map((item: any) => (
            <div className="flex mt-5 items-center justify-between">
              <Cards track={item} button={true} token={token}/>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default GetRec;
