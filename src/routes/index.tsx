import { type VoidComponent, Suspense, Show } from "solid-js";
import { trpc } from "~/utils/trpc";
import { createSession, signOut, signIn } from "@solid-auth/base/client";

const Home: VoidComponent = () => {
  const hello = trpc.example.hello.useQuery(() => ({ name: "from tRPC" }));
  return (
    <>
      <main class="flex min-h-[100svh] flex-col items-center justify-center bg-gradient-to-b from-[#026d56] to-[#152a2c]">
        <div class="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
          <p class="text-2xl text-white">
            {hello.data ?? "Loading tRPC query"}
          </p>
          <Suspense>
            <AuthShowcase />
          </Suspense>
        </div>
      </main>
      <footer>hi</footer>
    </>
  );
};

export default Home;

const AuthShowcase: VoidComponent = () => {
  const session = createSession();
  return (
    <div class="flex flex-col items-center justify-center gap-4">
      <Show
        when={session()}
        fallback={
          <button
            onClick={() => signIn("discord", { redirectTo: "/" })}
            class="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
          >
            Sign in
          </button>
        }
      >
        <span class="text-xl text-white">Welcome {session()?.user?.name}</span>
        <button
          onClick={() => signOut({ redirectTo: "/" })}
          class="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
        >
          Sign out
        </button>
      </Show>
    </div>
  );
};
