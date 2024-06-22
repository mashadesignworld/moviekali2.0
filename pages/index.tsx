
import Image from "next/image";

export default function Home() {
  return (

    <div className="relative h-full w-full bg-[url('/images/hero3.jpg')] bg-no-repeat bg-center bg-fixed bg-cover">
      <div className="bg-black w-full h-full lg:bg-opacity-50">
        <nav className="px-12 py-5">
          <h1 className="text-4xl font-bold underline text-white">MovieKali</h1>
        </nav>
      </div>
    </div>
  );
}

