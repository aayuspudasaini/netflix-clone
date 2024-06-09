"use client";

import { InfoIcon, PlayCircle } from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";
import PlayVideoModel from "./play-video-model";

interface iAppProps {
  overview: string;
  youtubeUrl: string;
  id: number;
  title: string;
  release: number;
  duration: number;
  age: number;
}

export default function MovieButtons({
  overview,
  youtubeUrl,
  id,
  title,
  release,
  age,
  duration,
}: iAppProps) {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <>
      <Button onClick={() => setOpen(true)} className="text-lg font-medium">
        <PlayCircle className="w-6 h-6 mr-2" />
        Play
      </Button>
      <Button
        onClick={() => setOpen(true)}
        className="text-lg font-medium bg-white/40 hover:bg-white/30 text-white"
      >
        <InfoIcon className="w-6 h-6 mr-2" />
        Learn More
      </Button>
      <PlayVideoModel
        key={id}
        release={release}
        title={title}
        youtubeUrl={youtubeUrl}
        age={age}
        duration={duration}
        overview={overview}
        state={open}
        changeState={setOpen}
      />
    </>
  );
}
