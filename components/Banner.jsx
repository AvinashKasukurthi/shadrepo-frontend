import { SiGithub } from "@icons-pack/react-simple-icons";
import { addUTMParams, UTM_CONTEXTS } from "@/lib/utm";

export default function Banner() {
  const githubLink = addUTMParams(
    "https://github.com/AvinashKasukurthi/shadrepo",
    UTM_CONTEXTS.github_contribution
  );

  return (
    <div className="dark bg-muted text-foreground px-4 py-3">
      <p className="text-center text-sm">
        <SiGithub
          className="me-3 -mt-0.5 inline-flex opacity-60"
          size={18}
          aria-hidden="true"
        />
        This project is in early development.{" "}
        <span className="text-muted-foreground">·</span>{" "}
        <a
          href={githubLink}
          target="_blank"
          className="font-medium underline hover:no-underline"
        >
          Contribute on GitHub
        </a>
      </p>
    </div>
  );
}
