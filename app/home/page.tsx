import MovieVideo from "@/components/movie-video";
import RecentlyAdded from "@/components/recently-added";
import React from "react";

export default function HomePage() {
  return (
    <div className="p-5 lg:p-0">
      <MovieVideo />
      <h1 className="font-bold text-3xl">Recently Added</h1>
      <RecentlyAdded />
    </div>
  );
}
