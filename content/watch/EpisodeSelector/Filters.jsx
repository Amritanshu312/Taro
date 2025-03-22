import Select from "@/components/ui/Select";

const Filters = ({ setDubSelected, setEpFromTo, SplitedEpisodes, chunkSize }) => (
  <div className="flex justify-between px-2 py-3 gap-4">
    <div className="w-full">
      <Select setSelected={setDubSelected} data={["sub & dub", "sub", "dub"]} defaultValue={0} />
    </div>
    <div className="w-full">
      <Select
        setSelected={setEpFromTo}
        data={Array.from({ length: SplitedEpisodes?.length ?? 0 }, (_, i) => `${i * chunkSize + 1} - ${(i + 1) * chunkSize}`)}
        defaultValue={0}
      />
    </div>
  </div>
);

export default Filters;
