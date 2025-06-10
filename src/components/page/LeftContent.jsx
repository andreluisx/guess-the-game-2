"use client";
import { useState } from "react";
import { getItemInLocalStorage } from "../../reducer/gameReducer";
import { ChartColumnIncreasing, Divide, Gamepad2 } from "lucide-react";

export default function LeftContent({ state }) {
  const [data, seData] = useState({ matches: 0, totalPoints: 0, media: 0 });
  useState(() => {
    const matches = getItemInLocalStorage("matches");
    const totalPoints = getItemInLocalStorage("totalPoints");
    seData({ matches, totalPoints, media: Math.ceil(totalPoints / matches) });
  }, [state, data]);

  const toRender = [
    {
      title: "Total de Partidas",
      value: data.matches || 0,
      icon: <Gamepad2 size={23} />,
    },
    {
      title: "Pontuação Total",
      value: data.totalPoints || 0,
      icon: <ChartColumnIncreasing size={23} />,
    },
    {
      title: "Média de Pontos",
      value: data.media || 0,
      icon: <Divide size={23} />,
    },
  ];

  return (
    <div
      style={{ fontFamily: "Roboto" }}
      className="z-30 pb-5 lg:pb-0 lg:w-2/6 w-full flex-row lg:flex-col gap-3 flex lg:px-4 px-0 justify-start items-start"
    >
      {toRender.map((info) => {
        return (
          <div
            key={info.title}
            className="h-fit min-h-30 w-full bg-black/50 rounded-3xl p-2 justify-center border border-slate-900"
          >
            <div className="flex text-slate-200 justify-center items-center pt-1 gap-2">
              <div className="flex flex-col lg:flex-row justify-center items-center gap-3">
                <div className="lg:p-3 p-2 bg-red-700 rounded-full flex justify-center items-center ">
                  {info?.icon}
                </div>
                <h3 className="text-sm text-center lg:text-xl">{info.title}</h3>
              </div>
            </div>
            <div className="flex  justify-center w-full items-center h-fit">
              <p className="md:text-4xl text-xl font-bold lg:p-3 p-1 text-shadow-2xs">
                {info.value}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
