import Link from "next/link";

export default function MoreBratGeneratorTools() {
  return (
    <section>
      <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-14 text-base leading-relaxed text-foreground/90">
        <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-foreground mb-4">
          More Brat Generator Tools
        </h2>
        <p className="mb-4">
          Use the <Link href="/brat-maker/" className="text-primary underline hover:no-underline">brat maker</Link> to create custom brat-style visuals. You can also try other tools from our brat generator collection.
        </p>
        <ul className="grid sm:grid-cols-2 gap-3 list-none pl-0">
          <li>
            <Link href="/brat-maker/" className="text-primary underline hover:no-underline">
              brat maker
            </Link>
          </li>
          <li>
            <Link href="/brat-text-generator/" className="text-primary underline hover:no-underline">
              brat text generator
            </Link>
          </li>
          <li>
            <Link href="/brat-maker/" className="text-primary underline hover:no-underline">
              Brat Maker
            </Link>
          </li>
          <li>
            <Link href="/brat-font-generator/" className="text-primary underline hover:no-underline">
              brat font tool
            </Link>
          </li>
          <li>
            <Link href="/brat-album-cover-generator/" className="text-primary underline hover:no-underline">
              brat album cover maker
            </Link>
          </li>
          <li>
            <Link href="/brat-maker/" className="text-primary underline hover:no-underline">
              brat meme maker
            </Link>
          </li>
          <li>
            <Link href="/brat-black-generator/" className="text-primary underline hover:no-underline">
              black brat generator
            </Link>
          </li>
          <li>
            <Link href="/brat-generator-pink/" className="text-primary underline hover:no-underline">
              pink brat generator
            </Link>
          </li>
        </ul>
      </div>
    </section>
  );
}
