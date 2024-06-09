"use client";
import { Heart, PlayCircle } from "lucide-react";
import { Button } from "./ui/button";
import PlayVideoModel from "./play-video-model";
import * as React from "react";
import { addToWatchList, removeFromWatchList } from "@/app/action";
import { usePathname } from "next/navigation";

interface iAppProps {
  title: string;
  overview: string;
  movieId: number;
  watchList: boolean;
  watchListId: string;
  youtubeUrl: string;
  year: number;
  age: number;
  time: number;
}

export function MovieCard({
  title,
  movieId,
  overview,
  watchList,
  watchListId,
  youtubeUrl,
  age,
  time,
  year,
}: iAppProps) {
  const [open, setOpen] = React.useState<boolean>(false);
  const pathname = usePathname();
  return (
    <>
      <button onClick={() => setOpen(true)} className="-mt-14">
        <PlayCircle className="h-20 w-20" />
      </button>
      <div className="right-5 top-5 absolute z-10">
        {watchList ? (
          <form action={removeFromWatchList}>
            <input type="hidden" name="watchListId" value={watchListId} />
            <input type="hidden" name="pathname" value={pathname} />
            <Button size="icon" variant="outline">
              <Heart className="w-4 h-4 text-red-500" />
            </Button>
          </form>
        ) : (
          <form action={addToWatchList}>
            <input type="hidden" name="movieId" value={movieId} />
            <input type="hidden" name="pathname" value={pathname} />

            <Button size="icon" variant="outline" type="submit">
              <Heart className="w-4 h-4 " />
            </Button>
          </form>
        )}
      </div>
      <div className="p-5 absolute bottom-0 left-0">
        <h1 className="font-bold text-lg line-clamp-1">{title}</h1>
        <div className="flex gap-x-2 items-center">
          <p className="font-normal text-sm">{year}</p>
          <p className="font-normal rounded text-sm border py-0.5 px-1 border-gray-200">
            {age}+
          </p>
          <p className="font-normal text-sm">{time}h</p>
        </div>
        <p className="line-clamp-1 text-sm text-gray-200 font-light">
          {overview}
        </p>
      </div>
      <PlayVideoModel
        title={title}
        youtubeUrl={youtubeUrl}
        overview={overview}
        key={movieId}
        state={open}
        changeState={setOpen}
        age={age}
        release={year}
        duration={time}
      />
    </>
  );
}
