// Função para limpar e normalizar texto
const normalizeText = (text) => {
  return text
    .toLowerCase()
    .normalize('NFD') // Decompõe os caracteres acentuados
    .replace(/[\u0300-\u036f]/g, '') // Remove marcas diacríticas
    .replace(/[:–—]/g, '') // Remove dois pontos e traços longos
    .replace(/-/g, ' ') // Substitui hífen por espaço
    .replace(/\s+/g, ' ') // Substitui múltiplos espaços por um só
    .trim();
};

// Regex para detectar algarismos romanos (simples)
const romanRegex = /\b(i{1,3}|iv|v|vi{0,3}|ix|x{1,3})\b/i;

// Função para extrair a parte principal do nome
const getMainGameName = (gameName) => {
  const colonMatch = gameName.match(/^([^:]+)/);
  const romanMatch = gameName.match(/^(.+?)\b(i{1,3}|iv|v|vi{0,3}|ix|x{1,3})\b/i);
  const numberMatch = gameName.match(/^([^0-9]+)/);

  if (colonMatch && colonMatch[1].trim() !== gameName.trim()) {
    return colonMatch[1].trim();
  }

  if (romanMatch && romanMatch[1].trim() !== gameName.trim()) {
    return romanMatch[1].trim();
  }

  if (numberMatch && numberMatch[1].trim() !== gameName.trim()) {
    return numberMatch[1].trim();
  }

  return gameName;
};

// Verificação com múltiplas palavras (sem separadores)
const checkPartialMatch = (gameName, userInput) => {
  const gameWords = normalizeText(gameName).split(' ').filter(word => word.length > 2);
  const inputWords = normalizeText(userInput).split(' ').filter(word => word.length > 2);

  let matches = 0;

  gameWords.forEach(gameWord => {
    if (inputWords.some(inputWord =>
      inputWord === gameWord ||
      gameWord.includes(inputWord) ||
      inputWord.includes(gameWord)
    )) {
      matches++;
    }
  });

  return matches >= 2;
};

// Verificação principal
export const checkGameAnswer = (gameName, userInput) => {
  const mainName = getMainGameName(gameName);

  const normalizedMain = normalizeText(mainName);
  const normalizedInput = normalizeText(userInput);

  // Se o nome principal for diferente do original (ou seja, tinha separador ou número romano), 1 palavra já pode bastar
  if (mainName !== gameName) {
    return normalizedMain.includes(normalizedInput);
  }

  // Caso contrário, exige pelo menos 2 palavras que batem ou uma correspondência exata
  return checkPartialMatch(gameName, userInput) || normalizeText(gameName) === normalizedInput;
};
