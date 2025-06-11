import { Skeleton } from "@mui/material";
import { Flag } from "lucide-react";

export default function RightContent({
  state,
  dispatch,
  setTipOppened,
  dispatchModal,
  loading,
}) {
  const renderHistory = () => {
    if (loading) {
      return (
        <div className="flex justify-start flex-col items-start px-4 py-1 gap-2">
          {Array.from({ length: 5 }).map((_, index) => (
            <Skeleton
              key={index}
              variant="rectangular"
              width={200}
              height={25}
              sx={{
                bgcolor: "rgba(255,255,255,0.1)",
                opacity: 1,
                borderRadius: 1,
              }}
            />
          ))}
        </div>
      );
    }

    if (state.responsesHistory.length === 0) {
      return (
        <p
          style={{ fontFamily: "Roboto" }}
          className="text-center lg:text-md text-sm text-slate-500"
        >
          Nenhuma tentativa ainda...
        </p>
      );
    }

    return (
      <div className="history-container">
        {state.responsesHistory.map((response, idx) => (
          <div key={idx} className="py-1 px-4">
            <p style={{ fontFamily: "Roboto" }} className="text-slate-300">
              {idx + 1}# - {response}
            </p>
          </div>
        ))}
      </div>
    );
  };

  const renderTips = () => {
    if (loading) {
      return (
        <div className="flex justify-start flex-row flex-wrap items-start px-1 py-1 gap-2">
          {Array.from({ length: 4 }).map((_, index) => (
            <Skeleton
              key={index}
              variant="rectangular"
              width={57}
              height={57}
              sx={{
                bgcolor: "rgba(255,255,255,0.1)",
                opacity: 1,
                borderRadius: 1,
              }}
            />
          ))}
        </div>
      );
    }
  
    return (
      <div className="flex flex-wrap gap-2 px-1 py-1">
        {state.tips.map((tip) => (
          <button
            key={tip.id}
            onClick={() => {
              dispatch({ type: "TIP_CLICK", payload: tip.id });
              setTipOppened(tip.tips);
              dispatchModal({ type: "TIP_MODAL" });
            }}
            className={`cursor-pointer hover:bg-slate-600 lg:min-h-14 lg:min-w-14 min-h-10 min-w-10 
              flex justify-center items-center text-slate-300 border border-slate-700 rounded-md
              ${tip?.clicked ? "bg-slate-500 text-slate-400" : "bg-slate-800"}`}
          >
            <p>{parseInt(tip.id)}</p>
          </button>
        ))}
      </div>
    );
  };

  return (
    <div className="z-30 lg:w-2/6 w-full lg:flex lg:flex-col flex flex-col-reverse justify-start items-center gap-3 px-4">
      <div
        style={{ fontFamily: "Roboto" }}
        className="h-fit w-full text-center mt-1 lg:mt-0 bg-black/80 rounded-3xl px-4 py-3 border border-slate-900"
      >
        <p className="text">Dicas [ -5 pontos ]:</p>
        <div className="flex flex-row justify-center mt-2 gap-3 flex-wrap">
          {renderTips()}
        </div>

        <button
          disabled={state.lose || state.win || loading}
          onClick={() => dispatchModal({ type: "SURRENDER_MODAL" })}
          className="w-full disabled:bg-slate-500 disabled:cursor-not-allowed p-2 lg:p-3 mt-3 cursor-pointer hover:bg-red-600 bg-red-700 rounded-md flex flex-row gap-2 justify-center items-center"
        >
          Desistir
          <Flag size={20} />
        </button>
      </div>
      <div className="h-fit lg:min-h-60 min-h-36 w-full mt-8 lg:mt-0 bg-black/80 rounded-3xl p-2 border border-slate-900">
        <h3
          style={{ fontFamily: "Roboto" }}
          className="text-center text-slate-100 py-3 text-md lg:text-lg"
        >
          Histórico de Respostas:
        </h3>
        {renderHistory()}
      </div>
    </div>
  );
}
