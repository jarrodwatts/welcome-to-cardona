import Image from "next/image";
import Link from "next/link";

export function Nav() {
  return (
    <div className="w-full flex items-center justify-center fixed top-0 left-0 z-50 rounded-xl shadow-md backdrop-blur-lg">
      <nav className="flex items-center justify-between w-full max-w-7xl py-5 px-4 border-b border-gray-800">
        {/* Left */}
        <div className="flex items-center gap-3 transition duration-150">
          <Link href="/" className="flex items-center">
            <Image
              src="/polygon.svg"
              width={111}
              height={28}
              alt="Polygon Logo"
            />
          </Link>
        </div>

        {/* Right */}
        <div className="flex gap-4 items-center"></div>
      </nav>
    </div>
  );
}
