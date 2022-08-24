import { Character } from "./Character";
import { Value } from "./Value";

export const ESCAPE = Character.from('\\');
export const NEWLINE = Character.from('\n');
export const SPACE = Character.from(' ');
export const PIPE = Character.from('|');
export const ESCPIPE = new Value('|');
