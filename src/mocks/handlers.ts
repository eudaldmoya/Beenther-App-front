import { rest } from "msw";
import { destinationsMock } from "./destinationsMock";

export const handlers = [
  rest.get(
    `${import.meta.env.VITE_DESTINATIONS_API_URL}/destinations`,
    (_req, res, ctx) => {
      return res(ctx.status(200), ctx.json({ destinations: destinationsMock }));
    },
  ),
];

export const errorHandlers = [
  rest.get(
    `${import.meta.env.VITE_DESTINATIONS_API_URL}/destinations`,
    (_req, res, ctx) => {
      return res(ctx.status(404, "Could not get the destinations"));
    },
  ),
];
