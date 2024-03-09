import React, { use } from "react";
import { useClientContext } from "./client.js";
import { Exports, getMixContext } from "./server.js";

export { getMixContext } from "./server";
export const createMixServerContext = Exports.createMixServerContext;

export const getComponentType = () =>
  !React["useState"]
    ? "Server"
    : React["createServerContext"] || !React["useOptimistic"]
    ? "Pages"
    : "Client";

export const useMixContext = <T>(context: { name: string; type: T }) => {
  if (getComponentType() === "Server") {
    return use(getMixContext<T>(context));
  }
  return useClientContext<T>(context.name);
};

export const createMixContext = <T>(name: string) => {
  const context =
    getComponentType() === "Server"
      ? createMixServerContext<T>(name)
      : { name };
  return context as ReturnType<typeof createMixServerContext<T>> & { type: T };
};
