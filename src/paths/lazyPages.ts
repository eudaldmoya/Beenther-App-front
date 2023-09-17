import { lazy } from "react";

export const HomePagePreview = lazy(() => import("../pages/HomePage/HomePage"));

export const ErrorPagePreview = lazy(
  () => import("../pages/ErrorPage/ErrorPage"),
);

export const DestinationsPagePreview = lazy(
  () => import("../pages/DestinationsPage/DestinationsPage"),
);

export const DestinationDetailPagePreview = lazy(
  () => import("../pages/DestinationDetailPage/DestinationDetailPage"),
);

export const AddDestinationPagePreview = lazy(
  () => import("../pages/AddDestinationPage/AddDestinationPage"),
);
