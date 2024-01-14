/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Userdata } from "./Auth";
import { db } from "../firebase";
import { Timestamp, collection, getDocs } from "firebase/firestore";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";

type Remoteuser = {
  name: string;
  score: number;
  createdAt: Timestamp;
};

const Menue = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [localrank, setlocalrank] = useState<number[]>([]);
  const [remoterank, setremoterank] = useState<Remoteuser[]>([]);

  useEffect(() => {
    const auth = localStorage.getItem("auth");
    if (!auth) navigate("/");
    else {
      const data: Userdata[] = JSON.parse(auth).data;
      const user = data.filter((value) => {
        return value.name === params.name;
      });
      if (user.length === 0) {
        navigate("/");
        return;
      }
      const userrank = user[0].scores;
      const arrange = (a: number, b: number) => {
        return b - a;
      };
      userrank.sort(arrange);
      setlocalrank(userrank);
    }

    const usersData = collection(db, "users");
    getDocs(usersData).then((snapShot): void => {
      const array = snapShot.docs.map((doc) => ({ ...doc.data() }));

      const newrank = array.filter((value) => {
        return value.score !== 0;
      }) as Remoteuser[];
      const arrange = (a: Remoteuser, b: Remoteuser) => {
        return b.score - a.score;
      };
      newrank.sort(arrange);
      setremoterank(newrank);
    });
  }, []);
  return (
    <div className="w-screen h-screen bg-gray-900 flex flex-col items-center">
      <img className="w-[600px] mr-[650px]" src="/img/Title.png" />
      <p className="text-white">ユーザーネーム:　{params.name}</p>
      <div className="w-[1300px] mt-14 flex justify-between">
        {/* localrankbox */}
        <div className="rank w-[370px] h-[400px]  border-[1px]  border-black ">
          <div className="bg-red-600 flex justify-center  border-b-[1px] border-black">
            <h1 className=" text-4xl text-white">{params.name}のスコア</h1>
          </div>
          {localrank.length !== 0
            ? localrank.map((value) => {
                return (
                  <div className="rank-item  w-full h-[70px] border-b-[1px] border-black flex text-white">
                    <p className="text-4xl">スコア:　{value}</p>
                  </div>
                );
              })
            : null}
        </div>
        {/* centernav */}
        <div className="flex flex-col items-center">
          <img className="rotate w-52 " src="/img/rotatelogo.png" />
          <div className="w-32 h-16 mt-7 flex items-center justify-between">
            <FaArrowLeft
              className="text-4xl"
              onClick={() => {
                const move = document.getElementById("move");
                if (move && move.style.left !== "0px") {
                  const current = Number(move.style.left.replace("px", ""));
                  const newleft = String(current + 40) + "px";
                  move.style.left = newleft;
                }
              }}
            />
            <div className="w-10 h-full overflow-hidden relative">
              <div
                id="move"
                className="w-[120px] h-16 flex justify-between absolute top-0"
                style={{ left: "0px" }}
              >
                <div className="w-10 h-full ">
                  <div className="w-10 h-9 text-center text-3xl">😀</div>
                  <p className="w-10 h-7 text-2xl text-center">優</p>
                </div>
                <div className="w-10 h-full text-center text-3xl">
                  <div className="w-10 h-9 ">😐</div>
                  <p className="w-10 h-7 text-2xl text-center">中</p>
                </div>
                <div className="w-10 h-full text-center text-3xl">
                  <div className="w-10 h-9 ">😈</div>
                  <p className="w-10 h-7 text-2xl text-center">鬼</p>
                </div>
              </div>
            </div>
            <FaArrowRight
              className="text-4xl"
              onClick={() => {
                const move = document.getElementById("move");
                if (move && move.style.left !== "-80px") {
                  const current = Number(move.style.left.replace("px", ""));
                  const newleft = String(current - 40) + "px";
                  move.style.left = newleft;
                }
              }}
            />
          </div>

          <button className="button mt-5">始める</button>
        </div>
        {/* remoterankbox */}
        <div className="rank w-[370px] h-[400px]  border-[1px]  border-black text-white ">
          <div className="w-full h-[50px] bg-red-600 flex justify-center border-b-[1px] border-black">
            <h1 className=" text-4xl text-white">全国のスコアランキング</h1>
          </div>
          {remoterank.length !== 0
            ? remoterank.map((value) => {
                return (
                  <div className="rank-item  w-full h-[70px]  border-b-[1px] border-black">
                    <p className="text-[16px]">名前:　{value.name}</p>
                    <div className="flex">
                      <p className="text-4xl">スコア: {value.score}</p>
                    </div>
                  </div>
                );
              })
            : null}
        </div>
      </div>
    </div>
  );
};

export default Menue;
