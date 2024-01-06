import React, { ReactNode, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { validationSchema } from "../util/validationSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";
import { useAdduser } from "../hooks/useAdduser";

const Auth = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{ name: string }>({
    mode: "onChange",
    resolver: zodResolver(validationSchema),
  });
  const navigate = useNavigate();

  const [localnames, setlocalnames] = useState<string[]>([]);
  const [remotenames, setremotenames] = useState<string[]>([]);
  const { adduser } = useAdduser();

  useEffect(() => {
    if (localStorage.getItem("auth"))
      setlocalnames(
        JSON.parse(localStorage.getItem("auth") as string).names as string[]
      );
    else localStorage.setItem("auth", JSON.stringify(localnames));
    const usersData = collection(db, "users");

    getDocs(usersData).then((snapShot): void => {
      const array = snapShot.docs.map((doc) => ({ ...doc.data() }));
      if (array.length === 0 || !array) setremotenames([]);
      else {
        const newarray = array.map((value) => value.name);
        setremotenames(newarray);
      }
    });
  }, []);

  const checkname = (name: string, array: string[]) => {
    if (array.length !== 0 && array.includes(name)) return true;
    else return false;
  };

  const onSubmit = (data: { name: string }) => {
    if (checkname(data.name, localnames)) navigate(`/menue/${data.name}`);
    else if (
      !checkname(data.name, localnames) &&
      !checkname(data.name, remotenames)
    ) {
      const newlocalnames = [...localnames, data.name];
      localStorage.setItem("auth", JSON.stringify({ names: newlocalnames }));
      adduser({ username: data.name, score: 0 });
      navigate(`/menue/${data.name}`);
    } else if (
      !checkname(data.name, localnames) &&
      checkname(data.name, remotenames)
    ) {
      alert("既にこの名前は存在します");
      return;
    }
  };

  return (
    <div className="w-screen h-screen bg-gray-900 flex flex-col  items-center">
      <div className="w-full flex ">
        <img className="w-[600px] ml-12" src="./img/Title.png" />
      </div>
      <div className="w-screen mt-44 flex flex-col items-center">
        <h1 className=" text-2xl text-white text-center">
          新しい名前、
          <br />
          もしくは既に使った名前を入力しよう！
        </h1>
        <form
          className="flex flex-col items-center"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div>
            <label className="text-white" htmlFor="name">
              名前
            </label>
            <input
              id="name"
              className="ml-4 mt-5 outline-none"
              type="text"
              {...register("name")}
            />
          </div>
          <p className="ml-11">{errors.name?.message as ReactNode}</p>
          <button className="button ml-11 mt-2">決定</button>
        </form>
      </div>
    </div>
  );
};

export default Auth;
