import type { Status } from "./types";

/** True on the live production deployment. Placeholders are hidden there. */
export const isProduction = process.env.VERCEL_ENV === "production";

/** Whether content with this status should render on this deployment. */
export const shouldShow = (status: Status) => !(isProduction && status === "placeholder");

/** Whether review badges should render (dev and preview only). */
export const showStatusBadges = !isProduction;
