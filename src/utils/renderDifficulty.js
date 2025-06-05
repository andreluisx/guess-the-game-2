export default function renderDifficulty(state) {
  switch (state.hearts) {
    case 6: // Muito difícil
      return "brightness-50 blur-sm";
    case 5: // Difícil
      return "brightness-50 contrast-100 grayscale blur-[4px]"; 
    case 4: // Médio
      return "brightness-75 contrast-90 grayscale blur-[3px]";
    case 3: // Médio
      return "brightness-90 contrast-100 blur-[3px]";
    case 2: // Médio
      return "brightness-95 contrast-105 blur-[2px]";
    case 1: // Muito fácil
      return "brightness-100 contrast-110";
    default:
      return "";
  }
};