import { db } from "@/lib/db";
import Image from "next/image";
import { MovieCard } from "./movie-card";

async function getData() {
  const res = await db.movie.findMany({
    select: {
      id: true,
      overview: true,
      title: true,
      watchList: true,
      imageString: true,
      youtubeString: true,
      age: true,
      releaseDate: true,
      duration: true,
    },
    orderBy: {
      createdAt: "asc",
    },
    take: 4,
  });
  return res;
}
export default async function RecentlyAdded() {
  const data = await getData();
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-8 gap-6">
      {data.map((movie) => (
        <div key={movie.id} className="relative h-48">
          <Image
            src={movie.imageString}
            alt={movie.title}
            className="rounded-sm absolute w-full h-full object-cover"
            width={500}
            height={400}
          />
          <div className="h-60 relative z-10 w-full tansform transition duration-500 hover:scale-125 opacity-0 hover:opacity-100">
            <div className="bg-gradient-to-b from-transparent via-black/50 to-black z-10 w-full h-full rounded-lg flex items-center justify-center border">
              <Image
                src={movie.imageString}
                alt={movie.title}
                className="absolute w-full h-full rounded-lg -z-10 object-cover cursor-pointer"
                width={500}
                height={400}
              />
              <MovieCard
                movieId={movie.id}
                overview={movie.overview}
                title={movie.title}
                watchListId={movie.watchList[0]?.id}
                watchList={movie.watchList.length > 0 ? true : false}
                youtubeUrl={movie.youtubeString}
                key={movie.id}
                age={movie.age}
                time={movie.duration}
                year={movie.releaseDate}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
