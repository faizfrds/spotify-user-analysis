import { Tracks } from "@/types";
import SaveButton from "./SaveButton";
import { BsPlayFill } from "react-icons/bs";

interface CardsProps {
  track: any;
  button?: boolean;
  token?: string;
  index: number;
}

const Cards: React.FC<CardsProps> = ({ track, button, token, index }) => {
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
        className="items-center md:block hidden"
      >
        <BsPlayFill size={40} className="text-neutral-900 group-hover:text-white pl-3"/>
        <p className="text-neutral-500 justify-center md:flex md:group-hover:hidden pl-3 -translate-y-6">{index}</p>
      </a>

      <a
        className="w-full md:hidden flex"
        href={"https://open.spotify.com/track/" + track.id}
        target="#"
      >
        {fetchData()}
      </a>

      <div className="w-full md:flex hidden">
        {" "}
        {/* Display only on medium to large viewports*/}
        {fetchData()}
      </div>

      <div className="md:-translate-x-4 md:hidden md:group-hover:flex">
        {button ? <SaveButton trackId={track.id} token={token!} /> : <></>}
      </div>
    </div>
  );
};

export default Cards;
