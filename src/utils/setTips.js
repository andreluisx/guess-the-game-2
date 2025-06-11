export default function generateHintPairs(game, numberOfPairs = 4) {
  const possibleHints = [
    {
      key: "first_release_date",
      label: "Data de lançamento",
      render: () => {
        try {
          return game.first_release_date 
            ? new Date(game.first_release_date * 1000).toLocaleDateString('pt-BR')
            : null;
        } catch {
          return null;
        }
      }
    },
    {
      key: "involved_companies",
      label: "Empresa responsável",
      render: () => {
        const publisher = game.involved_companies?.find(c => c.publisher);
        return publisher?.company?.name || null;
      }
    },
    {
      key: "game_modes",
      label: "Modo de jogo",
      render: () => {
        const modes = game.game_modes?.map(g => g.name).filter(Boolean);
        return modes?.length ? modes.join(", ") : null;
      }
    },
    {
      key: "platforms",
      label: "Plataforma",
      render: () => {
        const platforms = game.platforms?.map(p => p.name).filter(Boolean);
        return platforms?.length ? platforms.join(", ") : null;
      }
    },
    {
      key: "genres",
      label: "Gênero",
      render: () => {
        const genres = game.genres?.map(g => g.name).filter(Boolean);
        return genres?.length ? genres.join(", ") : null;
      }
    },
    {
      key: "themes",
      label: "Tema",
      render: () => {
        const themes = game.themes?.map(t => t.name).filter(Boolean);
        return themes?.length ? themes.join(", ") : null;
      }
    },
    {
      key: "player_perspectives",
      label: "Perspectiva do jogador",
      render: () => {
        const perspectives = game.player_perspectives?.map(p => p.name).filter(Boolean);
        return perspectives?.length ? perspectives.join(", ") : null;
      }
    },
    {
      key: "rating",
      label: "Avaliação crítica",
      render: () => {
        return game.rating && game.rating > 0 
          ? `${Math.round(game.rating)} / 100`
          : null;
      }
    },
  ];

  // Filtra apenas as dicas que têm valores válidos
  const validHints = possibleHints.filter(hint => {
    const value = hint.render();
    return value !== null && value !== undefined && value !== "";
  });

  // Verifica se temos dicas suficientes para o número de pares solicitado
  const hintsNeeded = numberOfPairs * 2; // Cada par precisa de 2 dicas diferentes
  if (validHints.length < hintsNeeded) {
    console.warn(`Não há dicas suficientes. Disponíveis: ${validHints.length}, Necessárias: ${hintsNeeded}`);
    // Ajusta o número de pares baseado nas dicas disponíveis
    numberOfPairs = Math.floor(validHints.length / 2);
  }

  // Embaralha as dicas válidas
  const shuffledHints = validHints.sort(() => Math.random() - 0.5);

  // Seleciona as dicas necessárias (2 por par, sem repetição)
  const selectedHints = shuffledHints.slice(0, numberOfPairs * 2);

  // Cria os pares agrupando de 2 em 2
  const hintPairs = [];
  for (let i = 0; i < selectedHints.length; i += 2) {
    const pair = [selectedHints[i], selectedHints[i + 1]];
    
    hintPairs.push({
      id: `${Math.floor(i / 2) + 1}`,
      tips: pair,
      clicked: false
    });
  }

  return hintPairs;
}