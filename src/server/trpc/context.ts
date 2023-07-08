import type { inferAsyncReturnType } from "@trpc/server";
import type { createSolidAPIHandlerContext } from "solid-start-trpc";
import { getSession } from "@solid-auth/base";
import { authOptions } from "../auth";

export const createContextInner = async (
  opts: createSolidAPIHandlerContext
) => {
  const session = await getSession(opts.req, authOptions);
  return {
    ...opts,
    session,
  };
};

export const createContext = async (opts: createSolidAPIHandlerContext) => {
  return await createContextInner(opts);
};

export type IContext = inferAsyncReturnType<typeof createContext>;
