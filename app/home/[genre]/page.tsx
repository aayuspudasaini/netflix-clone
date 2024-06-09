import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { MovieCard } from "@/components/movie-card";
import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import Image from "next/image";

async function getData({
  category,
  userId,
}: {
  category: string;
  userId: string;
}) {
  switch (category) {
    case "shows": {
      const data = await db.movie.findMany({
        where: { category: "show" },
        select: {
          age: true,
          duration: true,
          releaseDate: true,
          id: true,
          title: true,
          imageString: true,
          overview: true,
          youtubeString: true,
          watchList: {
            where: {
              userId: userId,
            },
          },
        },
      });
      return data;
    }
    case "movies": {
      const data = await db.movie.findMany({
        where: { category: "movie" },
        select: {
          age: true,
          duration: true,
          releaseDate: true,
          id: true,
          title: true,
          imageString: true,
          overview: true,
          youtubeString: true,
          watchList: {
            where: {
              userId: userId,
            },
          },
        },
      });
      return data;
    }
    case "recently": {
      const data = await db.movie.findMany({
        where: { category: "recently" },
        select: {
          age: true,
          duration: true,
          releaseDate: true,
          id: true,
          title: true,
          imageString: true,
          overview: true,
          youtubeString: true,
          watchList: {
            where: {
              userId: userId,
            },
          },
        },
      });
      return data;
    }
    default: {
      throw new Error("Something went wrong..");
    }
  }
}
export default async function CategoryPage({
  params,
}: {
  params: { genre: string };
}) {
  const session = await getServerSession(authOptions);
  const data = await getData({
    category: params.genre,
    userId: "abc",
  });
  return (
    <>
      <h1 className="text-4xl text-white font-bold mt-10 px-5 sm:px-0 capitalize">
        {params.genre}
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 px-5 mt-10 gap-6">
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
    </>
  );
}
