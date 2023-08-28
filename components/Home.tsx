"use client";

import { useEffect, useLayoutEffect, useState } from "react";
import Signin from "./Signin";
import { access } from "fs";
import GetRecent from "./GetRecent";
import axios from "axios";
import { getReturnParamsFromSpotify } from "@/hooks/FetchParams";
import GetRec from "./GetRecommendation";
import { HiArrowLeft } from "react-icons/hi"

const Homepage = () => {
  const [login, isLoggedin] = useState(false);
  const [token, setAccessToken] = useState("");
  const [data, setData] = useState({});
  const [loading, isLoading] = useState(true);
  const [recs, getRecs] = useState(false);

  useEffect(() => {
    if (window.location.hash) {
      const { access_token, expires_in, token_type } =
        getReturnParamsFromSpotify(window.location.hash);
      isLoggedin(true);

      localStorage.clear();
      setAccessToken(access_token);
    }
  }, []);

  return (
    <div>
      {login ? (
        <div className="justify-center flex">
          <div className="flex-col justify-center lg:mt-20">
            <div className="text-white">my profile</div>
            <div className="">
              {recs ? (
                <div>
                  <button
                    onClick={() => getRecs(false)}
                    className=" text-white justify-center mt-4 py-3 px-4 rounded-full text-xl capitalize transition-colors flex items-center group"
                  >
                    <HiArrowLeft className="group-hover:-translate-x-1 transition mx-2" size={15}/>
                    <p className="text-neutral-300">
                        Back
                    </p>
                  </button>
                  <GetRec accessToken={token} />
                </div>
              ) : (
                <div>
                  <GetRecent accessToken={token} />
                  <button
                    onClick={() => getRecs(true)}
                    className="bg-green-500 text-white justify-center mt-4 py-3 px-4 rounded-full text-md capitalize font-semibold hover:bg-green-400 transition-colors"
                  >
                    see recommended songs
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        <Signin />
      )}
    </div>
  );
};

export default Homepage;
