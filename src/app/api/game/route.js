// app/api/guess-game/route.js
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    console.log('\n\nREQUISIÇÃO FEITA \n\n')
    const gamesResponse = await fetch("https://api.igdb.com/v4/games", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Client-ID": process.env.CLIENT_ID,
        Authorization: `Bearer ${process.env.TOKEN}`,
      },
      body: `
        fields id, name, summary, storyline, rating, genres.name, cover.url, screenshots.image_id,
               involved_companies.company.name, involved_companies.developer, involved_companies.publisher,
               first_release_date, platforms.name, game_modes.name, player_perspectives.name,
               themes.name, keywords.name, franchises.name, collection.name, external_games.category, external_games.url;
        where rating >= 85 & rating_count >= 200 & first_release_date > 946684800;
        sort follows desc;
        limit 300;
      `,
    });

    const games = await gamesResponse.json();
    if (!games || games.length === 0) throw new Error("Nenhum jogo encontrado");

    const sortedGames = games.sort((a, b) => (b.follows || 0) - (a.follows || 0));

    const weights = [];
    for (let i = 0; i < sortedGames.length; i++) {
      const weight = i < 50 ? 3 : i < 150 ? 2 : 1;
      for (let j = 0; j < weight; j++) {
        weights.push(i);
      }
    }

    const randomWeightedIndex = weights[Math.floor(Math.random() * weights.length)];
    const selectedGame = sortedGames[randomWeightedIndex];

    const screenshotsResponse = await fetch("https://api.igdb.com/v4/screenshots", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Client-ID": process.env.CLIENT_ID,
        Authorization: `Bearer ${process.env.TOKEN}`,
      },
      body: `
        fields image_id,url,width,height;
        where game = ${selectedGame.id};
        limit 10;
      `,
    });

    const screenshots = await screenshotsResponse.json();

    return NextResponse.json({
      game: selectedGame,
      screenshots,
      timeStamp: Date.now()
    });
  } catch (err) {
    console.error("Erro ao buscar jogo:", err);
    return NextResponse.json({
      game: null,
      screenshots: [],
    }, { status: 500 });
  }
}
