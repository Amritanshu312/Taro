"use server"
import { ANIME } from '@consumet/extensions';
import { compareTwoStrings } from 'string-similarity';

const kaianime = new ANIME.AnimeKai();


export async function getMappings(title) {
  // basic checks
  if (!title) return null;
  if (!title?.english) return null;
  if (!title?.romaji) return null;

  //** */ main logic
  let eng = await kaianime.search(title?.english);
  let rom = await kaianime.search(title?.romaji);
  // console.log(eng, rom)
  let english_search = eng?.results || [];
  let romaji_search = rom?.results || [];
  // Combine both results and remove duplicates
  const combined = [...english_search, ...romaji_search];

  const uniqueResults = Array.from(new Set(combined.map(item => JSON.stringify(item))))
    .map(item => JSON.parse(item));

  let highestComp = 0;
  let similarity_id = "";

  uniqueResults?.forEach((obj, i) => {
    const id = obj.id;
    const ob_title = obj.title;
    const ob_japaneseTitle = obj.japaneseTitle;

    const eng_comparision = compareTwoStrings(title?.english, ob_title)
    const jp_comparision = compareTwoStrings(title?.romaji, ob_japaneseTitle)

    const greatest_title = Math.max(eng_comparision, jp_comparision)

    if (highestComp < greatest_title) {
      highestComp = greatest_title
      similarity_id = id
    }
  });

  return similarity_id;
}
