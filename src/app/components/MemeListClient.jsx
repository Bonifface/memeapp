"use client";

import { useEffect, useState } from "react";
import { memesData } from "@/app/data/memes";
import { Card, CardFooter, Image, Link } from "@heroui/react";

export default function MemeListClient() {
  const [memes, setMemes] = useState(memesData);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const storedMemes = localStorage.getItem("memes");

    if (storedMemes) {
      try {
        setMemes(JSON.parse(storedMemes));
      } catch (error) {
        console.error("Invalid localStorage data:", error);
        setMemes(memesData);
        localStorage.setItem("memes", JSON.stringify(memesData));
      }
    } else {
      localStorage.setItem("memes", JSON.stringify(memesData));
    }

    setIsLoaded(true);
  }, []);

  if (!isLoaded) return null;

  return (
    <div className="max-w-[1440px] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 md:grid-cols-3 gap-4">
      {memes.map((meme) => (
        <Card key={meme.id} className="flex-col justify-between py-0">
          <Image
            isBlurred
            alt="Card background"
            className="object-contain p-3"
            src={meme.imageUrl}
            width={450}
            height={300}
          />
          <CardFooter className="p-3 px-4 pt-0 gap-1 flex-col items-start justify-between h-full">
            <p className="text-xs uppercase font-bold break-all">{meme.name}</p>
            <div className="flex items-start justify-between w-full">
              <Link
                color="foreground"
                href={meme.imageUrl}
                className="underline text-[14px]"
                target="_blank"
                rel="noopener noreferrer"
              >
                Link
              </Link>
              <h4 className="font-bold text-medium items-start ml-[10px]">
                ❤️ {meme.likes}
              </h4>
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
