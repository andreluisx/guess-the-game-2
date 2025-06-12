"use client";
import { useState, useEffect } from "react";
import { getItemInLocalStorage } from "../../reducer/gameReducer";
import { ChartColumnIncreasing, Divide, Gamepad2 } from "lucide-react";
import { Skeleton } from "@mui/material";

export default function LeftContent({ state, loading, statsUpdate }) {
  const [data, setData] = useState({ matches: 0, totalPoints: 0, media: 0 });

  // useEffect para executar quando state, loading ou statsUpdate mudarem
  useEffect(() => {
    const matches = getItemInLocalStorage("matches") || 0;
    const totalPoints = getItemInLocalStorage("totalPoints") || 0;
    const media = matches > 0 ? Math.ceil(totalPoints / matches) : 0;

    setData({ matches, totalPoints, media });
  }, [state, loading, statsUpdate]); // Adicionado statsUpdate para forçar atualização

  const toRender = [
    {
      title: "Total de Partidas",
      value: data.matches,
      icon: <Gamepad2 size={23} />,
    },
    {
      title: "Pontuação Total",
      value: data.totalPoints,
      icon: <ChartColumnIncreasing size={23} />,
    },
    {
      title: "Média de Pontos",
      value: data.media,
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
            <div className="flex justify-center w-full items-center h-fit">
              {!loading ? (
                <p className="md:text-4xl text-xl font-bold lg:p-3 p-1 text-shadow-2xs">
                  {info.value}
                </p>
              ) : (
                <Skeleton
                  variant="rectangular"
                  width={80}
                  height={40}
                  className="mx-2"
                  sx={{
                    marginTop:'7px',
                    bgcolor: "rgba(255,255,255,0.1)",
                    opacity: 1,
                    borderRadius: 1, // opcional: deixa os quadrados com cantos levemente arredondados
                  }}
                />
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
