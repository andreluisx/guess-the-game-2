import { checkGameAnswer } from "../utils/checkGameAnswer";

export const getItemInLocalStorage = (key) => {
  try {
    const result = localStorage.getItem(key);
    return result ? JSON.parse(result) : null;
  } catch (error) {
    console.log('erro ao buscar dados');
  }
}

export const setItemToLocalStorage = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.log('erro ao salvar dados no navegador');
  }
}

export const deleteItemInLocalStorage = (key) => {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.log('erro ao remover dados no navegador');
  }
}

export const incrementItemInLocalStorage = (key, amount = 1) => {
  const current = parseInt(localStorage.getItem(key)) || 0;
  const updated = current + amount;
  localStorage.setItem(key, JSON.stringify(updated));
};


export function gameReducer(state, action) {
  const totalPoints = getItemInLocalStorage("totalPoints");

  switch (action.type) {
    case 'INIT': {
      const newState = {
        ...state,
        totalHearts: action.payload.totalHearts,
        responsesHistory: action.payload.responsesHistory || [],
        input: '',
        hearts: action.payload.hearts,
        images: action.payload.images,
        imageNumber: action.payload.imageNumber || 0,
        game: action.payload.game,
        tips: action.payload.tips,
        points: action.payload.points,
        lose: action.payload.lose || false,
        win: action.payload.win || false,
      };
      setItemToLocalStorage('gameState', newState);
      return newState;
    }

    case 'CHANGE_INPUT':
      return { ...state, input: action.payload };

    case 'SUBMIT':
      if (state.input !== '' && state.hearts >= 0 && state.imageNumber < state.totalHearts) {

        if (checkGameAnswer(state.game.name, state.input)) {
          const newState = { ...state, win: true, imageNumber: state.totalHearts };
          setItemToLocalStorage('gameState', newState);
          incrementItemInLocalStorage('totalPoints', Math.ceil(state.points / 2))
          return newState;
        }

        if (state.hearts > 1) {
          const newState = { ...state, points: Math.floor(Math.max(0, state.points - (100 / state.totalHearts))), responsesHistory: [...state.responsesHistory, action.payload], input: '', hearts: state.hearts - 1, imageNumber: state.imageNumber + 1 }
          setItemToLocalStorage('gameState', newState);
          return newState;
        }
        const newState = { ...state, lose: true, points: Math.floor(Math.max(0, state.points - (100 / state.totalHearts))), responsesHistory: [...state.responsesHistory, action.payload], input: '', hearts: state.hearts - 1, imageNumber: state.imageNumber + 1 }
        setItemToLocalStorage('gameState', newState);

        
        return newState;
      }

      return state

    case 'SURRENDER':
      const newState = { ...state, lose: true, imageNumber: state.totalHearts, hearts: 0, points: 0 }
      setItemToLocalStorage('gameState', newState);
      return newState;

    case 'TIP_CLICK':

      if (state.tips.some((tip) => tip.id === action.payload && tip.clicked === true)) {
        return state
      }

      if (state.points > 0 && state.win === false) {
        const newState = {
          ...state, points: state.points - 5, tips: state.tips.map(tip =>
            tip.id === action.payload
              ? { ...tip, clicked: true }
              : tip
          )
        }
        setItemToLocalStorage('gameState', newState);
        return newState;
      }

      return state;

    case 'RESET_GAME':
      return { ...state, canStart: true }
    default:
      return state;
  }
}