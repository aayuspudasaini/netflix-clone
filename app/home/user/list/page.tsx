import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { MovieCard } from "@/components/movie-card";
import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import Image from "next/image";

async function getData(userId: string) {
  const data = await db.watchList.findMany({
    where: {
      userId: userId,
    },
    select: {
      Movie: {
        select: {
          id: true,
          title: true,
          age: true,
          duration: true,
          imageString: true,
          overview: true,
          releaseDate: true,
          watchList: true,
          youtubeString: true,
        },
      },
    },
  });
  return data;
}
export default async function WatchListPage() {
  const session = await getServerSession(authOptions);
  const data = await getData("abc");
  return (
    <>
      <h1 className="text-4xl text-white font-bold mt-10 px-5 sm:px-0 capitalize">
        Watch Lists
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 px-5 mt-10 gap-6">
        {data.map((movie) => (
          <div key={movie.Movie?.id as number} className="relative h-48">
            <Image
              src={movie.Movie?.imageString as string}
              alt={movie.Movie?.title as string}
              className="rounded-sm absolute w-full h-full object-cover"
              width={500}
              height={400}
            />
            <div className="h-60 relative z-10 w-full tansform transition duration-500 hover:scale-125 opacity-0 hover:opacity-100">
              <div className="bg-gradient-to-b from-transparent via-black/50 to-black z-10 w-full h-full rounded-lg flex items-center justify-center border">
                <Image
                  src={movie.Movie?.imageString as string}
                  alt={movie.Movie?.title as string}
                  className="absolute w-full h-full rounded-lg -z-10 object-cover cursor-pointer"
                  width={500}
                  height={400}
                />
                <MovieCard
                  movieId={movie.Movie?.id as number}
                  overview={movie.Movie?.overview as string}
                  title={movie.Movie?.title as string}
                  watchListId={movie.Movie?.watchList[0]?.id as string}
                  watchList={
                    (movie.Movie?.watchList.length as number) > 0 ? true : false
                  }
                  youtubeUrl={movie.Movie?.youtubeString as string}
                  key={movie.Movie?.id as number}
                  age={movie.Movie?.age as number}
                  time={movie.Movie?.duration as number}
                  year={movie.Movie?.releaseDate as number}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
