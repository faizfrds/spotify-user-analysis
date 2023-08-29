"use client";

import { useEffect, useLayoutEffect, useState } from "react";
import axios from "axios";
import { HiArrowLeft } from "react-icons/hi";

import Signin from "@/components/Signin";
import GetRecent from "@/components/GetRecent";
import { getReturnParamsFromSpotify } from "@/hooks/FetchParams";
import GetRec from "@/components/GetRecommendation";
import Profile from "@/components/Profile";
import Header from "@/components/Header";
import GetSaved from "@/components/GetSaved";

export default function Home() {
  const [login, isLoggedin] = useState(false);
  const [token, setAccessToken] = useState("");
  const [recs, getRecs] = useState(false);
  const [openTab, setOpenTab] = useState(1);

  useEffect(() => {
    if (window.location.hash) {
      const { access_token, expires_in, token_type } =
        getReturnParamsFromSpotify(window.location.hash);

      isLoggedin(true);

      setAccessToken(access_token);
    }
  }, [isLoggedin]);

  console.log(openTab);

  return (
    <div
      className={
        "bg-neutral-900 " +
        (login ? "lg:h-[108vh] md:h-[100vh] sm:h-[112vh] h-[136vh]" : "h-[70vh]")
      }
    >
      <div
        className={
          "bg-gradient-to-b from-purple-700/80 " +
          (login ? "h-[32vh]" : "h-[60vh]")
        }
      >
        {login ? (
          <div className="justify-center flex">
            <div className="flex-col justify-center lg:mt-14 mt-12">
              <div className="text-white">
                <Profile accessToken={token} />
              </div>
              <div className="">
                {recs ? (
                  <div className="justify-center flex flex-col lg:w-[85vh]">
                    <button
                      onClick={() => getRecs(false)}
                      className=" text-white mt-4 py-3 px-4 rounded-full text-xl capitalize transition-colors flex items-center group"
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
                  <div className="justify-center flex flex-col lg:w-[85vh] ">
                    <h1 className="mt-5 text-center text-white text-xl font font-semibold">
                      Your Top Tracks
                    </h1>

                    {/* Open tabs for choosing timeframe of top tracks */}
                    <ul
                      className="flex mb-0 list-none flex-wrap pt-3 pb-1 "
                      role="tablist"
                    >
                      <li className="-mb-px px-2 my-2 flex-auto text-center">
                        <a
                          className={
                            "text-xs font-bold uppercase px-4 py-3 shadow-xl rounded-full block leading-normal cursor-pointer " +
                            (openTab === 1
                              ? "text-neutral-900 bg-white"
                              : "text-neutral-200 bg-neutral-800 hover:bg-neutral-700 transition")
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
                      <li className="-mb-px px-2 my-2 flex-auto text-center">
                        <a
                          className={
                            "text-xs font-bold uppercase px-4 py-3 shadow-xl rounded-full block leading-normal cursor-pointer  " +
                            (openTab === 2
                              ? "text-neutral-900 bg-white"
                              : "text-neutral-200 bg-neutral-800 hover:bg-neutral-700 transition")
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
                      <li className="-mb-px px-2 my-2 flex-auto text-center">
                        <a
                          className={
                            "text-xs font-bold uppercase px-4 py-3 shadow-xl rounded-full block leading-normal cursor-pointer  " +
                            (openTab === 3
                              ? "text-neutral-900 bg-white"
                              : "text-neutral-200 bg-neutral-800 hover:bg-neutral-700 transition")
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
                        <div className="lg:w-full md:w-[60vh]">
                          <GetRecent
                            accessToken={token}
                            timeRange="short_term"
                          />
                        </div>
                      </div>
                      <div
                        className={openTab === 2 ? "block" : "hidden"}
                        id="link2"
                      >
                        <div className="lg:w-full md:w-[60vh]">
                          <GetRecent
                            accessToken={token}
                            timeRange="medium_term"
                          />
                        </div>
                      </div>
                      <div
                        className={openTab === 3 ? "block" : "hidden"}
                        id="link2"
                      >
                        <div className="lg:w-full md:w-[60vh]">
                          <GetRecent
                            accessToken={token}
                            timeRange="long_term"
                          />
                        </div>
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
    </div>
  );
}
