import { Tracks } from "@/types";
import SaveButton from "./SaveButton";
import { BsPlayFill } from "react-icons/bs";

interface CardsProps {
  track: any;
  button?: boolean;
  token?: string;
}

const Cards: React.FC<CardsProps> = ({ track, button, token }) => {
  const fetchData = () => {
    return (
      <div className="flex h-[10vh] w-full">
        <img src={track.album.images[1].url} className="m-2" />
        <div className="px-4 justify-center flex flex-col">
          <h1 className="md:text-xl text-md">{track.name}</h1>
          <h2 className="text-neutral-300">{track.album.artists[0].name}</h2>
        </div>
      </div>
    );
  };

  return (
    <div className="w-full md:hover:bg-neutral-700 flex group rounded-md items-center">
      <a
        href={"https://open.spotify.com/track/" + track.id}
        target="#"
        className="md:flex hidden text-neutral-900 group-hover:text-white pl-3"
      >
        <BsPlayFill size={30} />
      </a>

      <a
        className="w-full md:hidden flex"
        href={"https://open.spotify.com/track/" + track.id}
        target="#"
      >
        {fetchData()}
      </a>

      <div className="w-full md:flex hidden">{fetchData()}</div>

      <div className=" justify-center md:hidden md:group-hover:flex">
        {button ? <SaveButton trackId={track.id} token={token!} /> : <></>}
      </div>
    </div>
  );
};

export default Cards;
