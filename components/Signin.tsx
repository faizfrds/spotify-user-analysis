"use client"
import { useRouter } from "next/navigation";

const SPOTIFY_AUTHORIZE_ENDPOINT = "https://accounts.spotify.com/authorize"
const redirectURL = process.env.BASE_URL
const clientID = process.env.CLIENT_ID

const SPACE_DELIMITER = "%20";
const SCOPES = ["playlist-read-private", "user-top-read"];
const SCOPES_URL_PARAM = SCOPES.join(SPACE_DELIMITER);


const Signin = () => {

    console.log(redirectURL)
    const router = useRouter();

    const handleLogin = () => {
        router.push(`${SPOTIFY_AUTHORIZE_ENDPOINT}?client_id=${clientID}&redirect_uri=${process.env.BASE_URL}&scope=${SCOPES_URL_PARAM}&response_type=token&show_dialog=true`);
    }

    return ( 
        <div className="h-[95vh] flex flex-col text-center justify-center text-3xl">
            <div className="text-white font-semibold">
                Spotify Profile Viewer
            </div>
            <div className="flex justify-center">
            <a onClick={handleLogin} className="bg-green-500 text-white w-fit mt-6 py-2 px-10 text-sm rounded-full uppercase tracking-widest hover:bg-green-400 hover:cursor-pointer transition">
               sign in to your spotify
            </a>
            </div>
        </div>
     );
}
 
export default Signin;