import Hero from "@/components/hero/Hero";
import Banner from "@/components/Banner";
import RegistryCard from "@/components/registries/RegistryCard";
import { readFile } from "node:fs/promises";

async function fetchRegistries() {
  // From public folder
  const filePath = "./public/registries.json";
  const fileContents = await readFile(filePath, "utf8");
  const registries = JSON.parse(fileContents);
  return registries;
}

export default async function Home() {
  const registries = await fetchRegistries();

  return (
    <div>
      <Banner />
      <Hero />
      <div className="mt-12 px-6 pb-24 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-6 justify-items-center mx-52 ">
        {registries.map((registry) => (
          <RegistryCard
            key={registry.name}
            title={registry.name}
            description={registry.description}
            url={registry.url}
            type={registry.type}
          />
        ))}
      </div>
    </div>
  );
}
