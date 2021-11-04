/**
 * Needs to be done this way because tiny-glob bugs in production
 */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
import * as Glob from "tiny-glob";

export const glob = Glob;
