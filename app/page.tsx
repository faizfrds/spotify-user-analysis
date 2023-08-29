"use client";

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
  const [openTab, setOpenTab] = useState(1);

  useEffect(() => {
    if (window.location.hash) {
      const { access_token, expires_in, token_type } =
        getReturnParamsFromSpotify(window.location.hash);
      isLoggedin(true);

      localStorage.clear();
      setAccessToken(access_token);
    }
  }, []);

  console.log(openTab)

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
                <div className="justify-center flex flex-col md:w-[85vh]">
                  <h1 className="mt-3 text-center text-white text-xl font font-semibold">
                    Your Top Tracks
                  </h1>

                  {/* Open tabs for choosing timeframe of top tracks */}
                  <ul
                    className="flex mb-0 list-none flex-wrap pt-3 pb-1 flex-row"
                    role="tablist"
                  >
                    <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
                      <a
                        className={
                          "text-xs font-bold uppercase px-5 py-3 mx-4 shadow-xl rounded-full block leading-normal  " +
                          (openTab === 1
                            ? "text-white bg-green-500"
                            : "text-neutral-300")
                        }
                        onClick={(e) => {
                          e.preventDefault();
                          setOpenTab(1);
                        }}
                        role="tablist"
                      >
                        this month
                      </a>
                    </li>
                    <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
                      <a
                        className={
                          "text-xs font-bold uppercase px-5 py-3 mx-4 shadow-xl rounded-full block leading-normal  " +
                          (openTab === 2
                            ? "text-white bg-green-500"
                            : "text-neutral-300 bg-neutral-900/80 ")
                        }
                        onClick={(e) => {
                          e.preventDefault();
                          setOpenTab(2);
                        }}
                        role="tablist"
                      >
                        last 6 months
                      </a>
                    </li>
                    <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
                      <a
                        className={
                          "text-xs font-bold uppercase px-5 py-3 mx-4 shadow-xl rounded-full block leading-normal  " +
                          (openTab === 3
                            ? "text-white bg-green-500"
                            : "text-neutral-300 bg-neutral-900/80")
                        }
                        onClick={(e) => {
                          e.preventDefault();
                          setOpenTab(3);
                        }}
                        role="tablist"
                      >
                        all time
                      </a>
                    </li>
                  </ul>

                  <div className="tab-content">
                    <div
                      className={openTab === 1 ? "block" : "hidden"}
                      id="link1"
                    >
                      <GetRecent accessToken={token} timeRange="short_term"/>
                    </div>
                    <div
                      className={openTab === 2 ? "block" : "hidden"}
                      id="link2"
                    >
                      <GetRecent accessToken={token} timeRange="medium_term" />
                    </div>
                    <div
                      className={openTab === 3 ? "block" : "hidden"}
                      id="link2"
                    >
                      <GetRecent accessToken={token} timeRange="long_term" />
                    </div>
                  </div>

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
