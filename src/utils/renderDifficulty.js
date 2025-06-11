export default function renderDifficulty(state) {
  switch (state.hearts) {
    case 6: // Muito difícil
      return "brightness-50 contrast-110 sm:blur-sm blur-[2px] grayscale";
    case 5: // Difícil
      return "brightness-50 grayscale sm:blur-[4px] blur-[2px]"; 
    case 4: // Médio
      return "brightness-75 contrast-90 sm:blur-[3px] blur-[2px]";
    case 3: // Médio
      return "brightness-90 contrast-100 sm:blur-[2px] blur-[1px]";
    case 2: // Médio
      return "brightness-95 contrast-105 sm:blur-[2px] blur-[1px]";
    case 1: // Muito fácil
      return "brightness-100 contrast-110";
    default:
      return "";
  }
};