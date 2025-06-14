"use client";
import { useEffect, useReducer, useState } from "react";

// Reducers
import { gameReducer, getItemInLocalStorage, incrementItemInLocalStorage, setItemToLocalStorage } from "../reducer/gameReducer";
import { modalReducer } from "../reducer/modalReducer";

// Utils
import generateHintPairs from "../utils/setTips";

// Para renderizar na tela
import RenderResultModal from "../components/page/RenderResultModal";
import RenderTipsModal from "../components/page/RenderTipsModal";
import RenderSurrenderModal from "../components/page/SurrenderModal";

// Conteudos Principais do game
import PrincipalContent from "../components/page/PrincipalContent";
import RightContent from "../components/page/RightContent";
import LeftContent from "../components/page/LeftContent";

const MAX_SCREENSHOTS = 6;
const COOLDOWN_TIME = (Number(process.env.COOLDOWN_TIME) || 0.5) * 60 * 1000; // 30 sec

export default function ClientGame() {
  const modalsStates = {
    tipModal: false,
    resultModal: false,
    surrenderModal: false,
  };
  
  // Estado para controle de carregamento e erro
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  // Novo estado para forçar atualização do LeftContent
  const [statsUpdate, setStatsUpdate] = useState(0);
  
  // Recupera o último timestamp de requisição do localStorage
  const lastRequest = getItemInLocalStorage("lastRequest") || 0;
  const now = Date.now();

  // Estado inicial
  const initialState = {
    totalHearts: 0,
    responsesHistory: [],
    input: "",
    hearts: 0,
    images: [],
    imageNumber: 0,
    game: null,
    tips: [],
    points: 100,
    lose: false,
    win: false,
    canStart: false,
  };

  // Declarações de estado
  const [state, dispatch] = useReducer(gameReducer, initialState);
  const [modals, dispatchModal] = useReducer(modalReducer, modalsStates);
  const [isHovered, setIsHovered] = useState(false);
  const [tipOppened, setTipOppened] = useState([]);
  
  // Determina se podemos fazer uma nova requisição
  const canRequest = (now - lastRequest >= COOLDOWN_TIME) && (state.win || state.lose);

  // Função para buscar dados do jogo
  const fetchGameData = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/game`);
      
      if (!response.ok) {
        throw new Error("Falha ao buscar dados da API");
      }
      
      const data = await response.json();
      
      // Atualiza o timestamp da última requisição
      setItemToLocalStorage("lastRequest", Date.now());
      
      // Força atualização das estatísticas
      setStatsUpdate(prev => prev + 1);
      
      // Atualiza o estado com os novos dados
      dispatch({
        type: "INIT",
        payload: {
          totalHearts: data.screenshots.slice(0, MAX_SCREENSHOTS).length,
          input: "",
          hearts: data.screenshots.slice(0, MAX_SCREENSHOTS).length,
          images: data.screenshots.slice(0, MAX_SCREENSHOTS),
          game: data.game,
          tips: generateHintPairs(data.game, 4),
          points: 100,
        },
      });
    } catch (err) {
      console.error("Erro ao buscar jogo:", err);
      setError(err.message);
      
      // Tenta carregar estado salvo se houver erro
      const savedState = getItemInLocalStorage("gameState");
      if (savedState) {
        dispatch({
          type: "INIT",
          payload: savedState,
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Efeito para carregar dados iniciais
  useEffect(() => {
    const savedState = getItemInLocalStorage("gameState");
    
    if (savedState) {
      // Carrega jogo salvo
      dispatch({
        type: "INIT",
        payload: savedState,
      });
      
      // Se puder fazer nova requisição, atualiza os dados
      if (canRequest && (savedState.win || savedState.lose)) {
        fetchGameData();
      } else {
        setIsLoading(false);
      }
    } else {
      // Sem estado salvo, busca novo jogo
      fetchGameData();
    }
  }, []);

  // Salva o estado no localStorage sempre que ele mudar
  useEffect(() => {
    if (state.game) {
      setItemToLocalStorage("gameState", state);
    }
  }, [state]);

  // Verifica se o jogo acabou e salva a pontuação
  useEffect(() => {
    if ((state.win || state.lose) && !modals.resultModal) {
      // Salva a pontuação total quando o jogo termina
      if (state.points > 0) {
        incrementItemInLocalStorage('totalPoints', state.points);
        // Força atualização das estatísticas
        setStatsUpdate(prev => prev + 1);
      }
      
      dispatchModal({ type: "RESULT_MODAL" });
    }
  }, [state.win, state.lose, state.points]);

  // Renderização de erro
  if (error) {
    return (
      <div className="flex items-center justify-center h-screen text-white">
        <div className="text-center">
          <p className="text-red-500 mb-4">Erro ao carregar o jogo: {error}</p>
          <p className="text-red-500 mb-4">Pode ter acontecido um problema com o serviço externo utilizado. :( </p>
          <button 
            onClick={fetchGameData}
            className="px-4 py-2 bg-red-700 rounded-md hover:bg-red-600"
          >
            Tentar novamente
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-screen">
      
      {modals.tipModal && <RenderTipsModal tipOppened={tipOppened} dispatchModal={dispatchModal}/>}
      {modals.surrenderModal && <RenderSurrenderModal dispatch={dispatch} dispatchModal={dispatchModal}/>}
      {modals.resultModal && <RenderResultModal state={state} dispatchModal={dispatchModal}/>}

      {/* Tela inteira do site */}
      <div className="flex flex-col justify-center px-6 lg:px-0">
        {/* Header do site */}
        <div className="py-4 z-30 flex flex-row justify-center gap-2">
          <h1
            style={{ fontFamily: "Roboto-ExtraBold" }}
            className="text-center z-30 text-3xl"
          >
            <span className="text-red-700">GUESS</span> the{" "}
            <span className="text-red-700">GAME</span>{" "}
          </h1>
        </div>

        {/* Div que envolve o Conteudo */}
        <div className="flex lg:flex-row flex-col">
          {/* Conteúdo da esquerda / invisivel no celular */}
          <LeftContent 
            state={state} 
            loading={isLoading} 
            statsUpdate={statsUpdate} // Nova prop para forçar atualização
          />

          {/* Conteúdo central / Primeiro (celular) */}
          <PrincipalContent
            state={state}
            isHovered={isHovered}
            setIsHovered={setIsHovered}
            dispatch={dispatch}
            dispatchModal={dispatchModal}
            lastRequest={lastRequest}
            cooldownTime={COOLDOWN_TIME}
            fetchData={fetchGameData}
            loading={isLoading}
          />

          {/* Conteúdo direita / Ultimo (celular) */}
          <RightContent
            state={state}
            dispatch={dispatch}
            setTipOppened={setTipOppened}
            dispatchModal={dispatchModal}
            loading={isLoading}
          />
        </div>
      </div>
    </div>
  );
}