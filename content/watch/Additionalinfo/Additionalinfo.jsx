"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Characters from "./Characters/Characters";
import Relations from "./Relations/Relations";
import Comments from "@/content/watch/Comment/Comment";

const Additionalinfo = ({ info }) => {
  return (
    <div className="mt-8 mb-16 w-full">
      <div className="text-white flex w-full relative gap-2">
        <div className="w-full h-[1px] absolute bg-[#212029] bottom-[1px]"></div>
      </div>
      <Tabs defaultValue="characters" className=" pt-16 ">
        <TabsList className="bg-[#201f28]">
          <TabsTrigger value="characters">Characters</TabsTrigger>
          <TabsTrigger value="comments">Comments</TabsTrigger>
          <TabsTrigger value="relations">Relations</TabsTrigger>
        </TabsList>
        <TabsContent value="characters">
          <Characters info={info} />
        </TabsContent>
        <TabsContent value="comments">
          <Comments AnimeID={info.id} title={info?.title?.english} />
        </TabsContent>
        <TabsContent value="relations">
          <Relations info={info} setActive={"Relations"} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Additionalinfo;
