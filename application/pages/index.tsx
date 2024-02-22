import type { NextPage } from "next";

const Home: NextPage = () => {
  return (
    <div className="max-w-[1440px] bg-white/5 rounded-3xl p-18 relative overflow-hidden mt-24 mx-[2.5rem] min-h-[620px] p-6 sm:p-12 md:p-20">
      {/* Gradient 1 */}
      <img
        src="/gradient1.webp"
        className="absolute top-0 left-[-18%] w-full h-full -z-10"
      />

      {/* Gradient 2 */}
      <img
        src="/gradient2.webp"
        className="absolute top-0 left-[13%] w-full h-full -z-10"
      />

      {/* Content */}

      <div className="mx-auto flex flex-col pl-4">
        <h1 className="text-[2.675rem] font-medium leading-none">
          Polygon @ ETH Denver
        </h1>

        <p className="font-lg text-[#adabb2] mt-6">
          Welcome to ETH Denver, anon.
        </p>

        <p className="font-lg text-[#adabb2] mt-6">
          On February 29th, at 12:00:00, we'll open up a series of{" "}
          <strong>4 challenges</strong>.
        </p>

        <p className="font-lg text-[#adabb2] mt-6">
          In teams that you create on-chain, you&rsquo;ll have 24 hours to solve
          each challenge.
        </p>

        <p className="font-lg text-[#adabb2] mt-6">
          To play, you&rsquo;ll need to be either <strong>create</strong> or{" "}
          <strong>join</strong> a team.
        </p>
      </div>
    </div>
  );
};

export default Home;
