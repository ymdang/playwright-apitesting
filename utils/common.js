import { expect } from "@playwright/test";
import { match } from "assert";

/* String format.
* @param str String, needs to be formatted
* @param str Arguments, needs to be placed properely in the string.
*/

export const stringFormat = (str, ...args) =>
    str.replace(/{(\d+)}/g, (match,index) => args [index].toString() || "");
