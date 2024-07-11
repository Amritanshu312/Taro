"use client"
import CharacterItem from "./CharacterItem";
import { Fragment, useState, useMemo } from "react";
import { PaginationControls } from "./PaginationControls";

const Characters = ({ info }) => {
  const [page, setPage] = useState(1);

  const characters = useMemo(() => {
    const edges = info?.characters?.edges || [];
    if (!edges.length) return [];
    const chunkSize = 16;
    return edges.reduce((chunks, _, i) => {
      if (i % chunkSize === 0) {
        chunks.push(edges.slice(i, i + chunkSize));
      }
      return chunks;
    }, []);
  }, [info]);

  const next = () => setPage(prev => (prev < characters.length ? prev + 1 : prev));
  const prev = () => setPage(prev => (prev > 1 ? prev - 1 : prev));

  return (
    <>
      <PaginationControls page={page} totalPages={characters.length} next={next} prev={prev} />

      {characters.length > 0 ? (
        <div className="mt-8 grid grid-cols-[repeat(auto-fit,minmax(320px,1fr))] gap-[20px]">
          {characters[page - 1].map((data, index) => (
            <Fragment key={index}>
              <CharacterItem data={data} />
            </Fragment>
          ))}
        </div>
      ) : (
        <div className="mt-8 text-center text-[#c4c7cc]">No characters available</div>
      )}
    </>
  );
};


export default Characters;
