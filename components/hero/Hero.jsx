import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, CirclePlay } from "lucide-react";
import Link from "next/link";
import React from "react";

const Hero = () => {
  return (
    <div className="mt-12 flex items-center justify-center px-6">
      <div className="text-center max-w-3xl">
        <Badge variant="secondary" className="py-1 border-border" asChild>
          <Link href="#">
            Just released v0.1.0 <ArrowUpRight className="ml-1 size-4" />{" "}
            <Badge variant="outline" className="gap-1.5 bg-input">
              <span
                className="size-1.5 rounded-full bg-red-500"
                aria-hidden="true"
              ></span>
              Beta
            </Badge>
          </Link>
        </Badge>

        <h1 className="mt-6 text-2xl sm:text-3xl md:text-4xl lg:text-5xl md:leading-[1.2] font-semibold tracking-tighter">
          Discover and Share Shadcn UI Components
        </h1>
        <p className="mt-6 md:text-base">
          A curated registry of third-party Shadcn UI components and extensions.
          Find, explore, and contribute to a growing collection of
          community-driven resources.
        </p>
      </div>
    </div>
  );
};

export default Hero;
