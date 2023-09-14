import { rest } from "msw";
import {
  destinationMock,
  destinationsMock,
  destinationsMockForm,
} from "./destinationsMock";
import paths from "../paths/paths";

export const handlers = [
  rest.get(
    `${import.meta.env.VITE_DESTINATIONS_API_URL}${paths.destinations}`,
    (_req, res, ctx) => {
      return res(ctx.status(200), ctx.json({ destinations: destinationsMock }));
    },
  ),
  rest.get(
    `${import.meta.env.VITE_DESTINATIONS_API_URL}${paths.destinations}/${
      destinationsMock[0]._id
    }`,
    (_req, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json({ destination: destinationsMock[0] }),
      );
    },
  ),
  rest.delete(
    `${import.meta.env.VITE_DESTINATIONS_API_URL}${paths.destinations}/${
      destinationsMock[0]._id
    }`,
    (_req, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json({ message: "Destination deleted successfully" }),
      );
    },
  ),
  rest.post(
    `${import.meta.env.VITE_DESTINATIONS_API_URL}${paths.destinations}`,
    (_req, res, ctx) => {
      return res(ctx.status(201), ctx.json({ destination: destinationMock }));
    },
  ),
];

export const errorHandlers = [
  rest.get(
    `${import.meta.env.VITE_DESTINATIONS_API_URL}${paths.destinations}`,
    (_req, res, ctx) => {
      return res(ctx.status(404, "Could not get the destinations"));
    },
  ),
  rest.get(
    `${import.meta.env.VITE_DESTINATIONS_API_URL}${paths.destinations}/${
      destinationsMock[0]._id
    }`,
    (_req, res, ctx) => {
      return res(ctx.status(404, "Could not get the destination"));
    },
  ),
  rest.delete(
    `${import.meta.env.VITE_DESTINATIONS_API_URL}${paths.destinations}/${
      destinationsMock[0]._id
    }`,
    (_req, res, ctx) => {
      return res(ctx.status(404, "Could not delete the destination"));
    },
  ),
  rest.post(
    `${import.meta.env.VITE_DESTINATIONS_API_URL}${paths.destinations}`,
    (_req, res, ctx) => {
      return res(ctx.status(500, "Could not create the destination"));
    },
  ),
];

export const formHandlers = [
  rest.post(
    `${import.meta.env.VITE_DESTINATIONS_API_URL}${paths.destinations}`,
    (_req, res, ctx) => {
      return res(ctx.status(201), ctx.json({ destination: destinationMock }));
    },
  ),
  rest.get(
    `${import.meta.env.VITE_DESTINATIONS_API_URL}${paths.destinations}`,
    (_req, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json({ destinations: destinationsMockForm }),
      );
    },
  ),
];

export const detailHandlers = [
  rest.get(
    `${import.meta.env.VITE_DESTINATIONS_API_URL}${paths.destinations}/${
      destinationsMock[0]._id
    }`,
    (_req, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json({ destination: destinationsMock[0] }),
      );
    },
  ),
];
