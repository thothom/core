import { promisify } from "util";
import { glob as Glob } from "glob";

export const globUtil = promisify(Glob);
