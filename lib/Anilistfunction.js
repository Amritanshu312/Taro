import { trending, animeinfo, advancedsearch, top100anime, seasonal, popular } from "./anilistqueries";

export const TrendingAnilist = async () => {
  try {
    const response = await fetch('https://graphql.anilist.co', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        query: trending,
        variables: {
          page: 1,
          perPage: 15,
        },
      }),
      // }, { cache: "no-store" });
    }, { next: { revalidate: 3600 } });

    const data = await response.json();
    return data.data.Page.media;
  } catch (error) {
    console.error('Error fetching data from AniList:', error);
  }
}

export const PopularAnilist = async (page = 1) => {
  try {
    const response = await fetch('https://graphql.anilist.co', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        query: popular,
        variables: {
          page: page,
          perPage: page === 1 ? 31 : 13,
        },
      }),
      // }, { cache: "no-store" });
    }, { next: { revalidate: 3600 } });

    const data = await response.json();
    return data.data.Page.media;
  } catch (error) {
    console.error('Error fetching popular data from AniList:', error);
  }
}

export const Top100Anilist = async () => {
  try {
    const response = await fetch('https://graphql.anilist.co', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        query: top100anime,
        variables: {
          page: 1,
          perPage: 10,
        },
      }),
    }, { next: { revalidate: 3600 } });

    const data = await response.json();
    return data.data.Page.media;
  } catch (error) {
    console.error('Error fetching data from AniList:', error);
  }
}

export const SeasonalAnilist = async () => {
  try {
    const response = await fetch('https://graphql.anilist.co', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        query: seasonal,
        variables: {
          page: 1,
          perPage: 29,
        },
      }),
    }, { next: { revalidate: 3600 } });

    const data = await response.json();
    return data.data.Page.media;
  } catch (error) {
    console.error('Error fetching data from AniList:', error);
  }
}

export const AnimeInfoAnilist = async (animeid) => {
  try {
    const response = await fetch('https://graphql.anilist.co', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        query: animeinfo,
        variables: {
          id: animeid,
        },
      }),
      // }, { cache: "no-store" });
    }, { next: { revalidate: 3600 } });

    const data = await response.json();
    return data.data.Media;
  } catch (error) {
    console.error('Error fetching data from AniList:', error);
  }
}

export const AdvancedSearch = async (
  searchvalue,
  seasonvalue = null,
  formatvalue = null,
  genrevalue = null,
  statusvalue = null,
  sortbyvalue = null,
  currentPage = 1,
  country = null,
  startYear = null,
  episodes = null,
  selectedYear = null
) => {

  console.log(startYear);


  try {
    const response = await fetch('https://graphql.anilist.co', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        query: advancedsearch,
        variables: {
          ...(searchvalue && {
            search: searchvalue,
            ...(!sortbyvalue && { sort: "SEARCH_MATCH" }),
          }),
          type: "ANIME",
          isAdult: false,
          ...(selectedYear && { seasonYear: selectedYear }),
          ...(statusvalue && { status: statusvalue }),
          ...(seasonvalue && { season: seasonvalue }),
          ...(formatvalue && { format: formatvalue }),
          ...(sortbyvalue && { sort: sortbyvalue }),

          ...(country && { countryOfOrigin: country }),
          ...(startYear && { startDate: startYear }),
          ...(episodes && { episodes: parseInt(episodes) }),

          ...(genrevalue && { ...genrevalue }),
          ...(currentPage && { page: currentPage }),
        },

      }),
    });

    const data = await response.json();
    return data.data.Page;
  } catch (error) {
    console.error('Error fetching search data from AniList:', error);
  }
};