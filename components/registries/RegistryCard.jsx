"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";

const RegistryCard = ({ title, description, url }) => {
  function handleClick() {
    window.open(url, "_blank");
  }

  return (
    <Card className="w-72 p-0 hover:cursor-pointer" onClick={handleClick}>
      <CardContent className="p-3 ">
        <div className="aspect-[16/7] rounded-md bg-gray-100 mb-2">
          <Image
            src={`/og/image/${encodeURIComponent(url)}`}
            alt={`${title} registry preview`}
            className="object-cover w-full h-full max-h-32 sm:max-h-40 md:max-h-48 rounded-t-xl"
            loading="lazy"
            width={320}
            height={140}
          />
        </div>
        <CardTitle className="text-sm mb-1">{title}</CardTitle>
        <CardDescription className="text-xs mb-2 line-clamp-2">
          {description}
        </CardDescription>
        <div className="flex items-center justify-between">
          <span className="text-sm font-bold">Free</span>
          <Button size="md" className="text-xs px-2 py-1 h-7">
            View <ArrowUpRight className="size-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default RegistryCard;
