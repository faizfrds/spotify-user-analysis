"use client";
import Homepage from "@/components/Home";

import { useEffect, useLayoutEffect, useState } from "react";
import axios from "axios";
import { HiArrowLeft } from "react-icons/hi";

import Signin from "@/components/Signin";
import GetRecent from "@/components/GetRecent";
import { getReturnParamsFromSpotify } from "@/hooks/FetchParams";
import GetRec from "@/components/GetRecommendation";
import Profile from "@/components/Profile";

export default function Home() {
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
    <div className="bg-neutral-900 h-[110vh]">
      {login ? (
        <div className="justify-center flex">
          <div className="flex-col justify-center lg:mt-20">
            <div className="text-white">
              <Profile accessToken={token} />
            </div>
            <div className="">
              {recs ? (
                <div>
                  <button
                    onClick={() => getRecs(false)}
                    className=" text-white justify-center mt-4 py-3 px-4 rounded-full text-xl capitalize transition-colors flex items-center group"
                  >
                    <HiArrowLeft
                      className="group-hover:-translate-x-1 transition mx-2"
                      size={15}
                    />
                    <p className="text-neutral-300">Back</p>
                  </button>
                  <GetRec accessToken={token} />
                </div>
              ) : (
                <div className="justify-center flex flex-col">
                  <GetRecent accessToken={token} />
                  <div className="flex justify-center">
                    <button
                      onClick={() => getRecs(true)}
                      className="bg-green-500 text-white w-fit flex mt-4 py-3 px-4 rounded-full text-md capitalize font-semibold hover:bg-green-400 transition"
                    >
                      see recommended songs
                    </button>
                  </div>
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
}
