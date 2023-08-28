import { Tracks } from "@/types";

interface CardsProps {
    track: any;
}

const Cards: React.FC<CardsProps> = ({track}) => {

    return ( 
        <div className="flex h-[10vh]">  

            <img src={track.album.images[1].url}/>
            <div className="px-4 justify-center flex flex-col">
                <h1 className="text-2xl">
                    {track.name}
                </h1>
                <h2 className="text-neutral-300">
                    {track.album.artists[0].name}
                </h2>  
            </div>
        </div>
     );
}
 
export default Cards;