import { db } from "@/lib/db";
import { Button } from "./ui/button";
import MovieButtons from "./movie-button";

async function getData() {
  const data = await db.movie.findFirst({
    select: {
      title: true,
      overview: true,
      videoSource: true,
      imageString: true,
      releaseDate: true,
      duration: true,
      id: true,
      age: true,
      youtubeString: true,
    },
  });
  return data;
}
export default async function MovieVideo() {
  const data = await getData();
  return (
    <div className="h-[55vh] lg:h-60vh] w-full flex items-center justify-start">
      <video
        poster={data?.imageString}
        autoPlay
        loop
        muted
        src={data?.videoSource}
        className="w-full absolute -z-10 top-0 left-0 h-[60vh] object-cover brightness-[60%]"
      ></video>
      <div className="absolute w-[90%] lg:w-[40%] mx-auto">
        <h1 className="text-white text-4xl md:text-5xl lg:text-6xl font-bold">
          {data?.title}
        </h1>
        <p className="text-white text-lg mt-4 line-clamp-3">{data?.overview}</p>
        <div className="flex gap-x-3 mt-4">
          <MovieButtons
            key={data?.id}
            id={data?.id as number}
            age={data?.age as number}
            youtubeUrl={data?.youtubeString as string}
            title={data?.title as string}
            duration={data?.duration as number}
            release={data?.releaseDate as number}
            overview={data?.overview as string}
          />
        </div>
      </div>
    </div>
  );
}
