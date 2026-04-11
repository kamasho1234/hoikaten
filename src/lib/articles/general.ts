import { registerArticles } from "./index";
import { interviewArticles1 } from "./general-interview-1";
import { interviewArticles2 } from "./general-interview-2";
import { roundtableArticles } from "./general-roundtable";
import { guideArticles } from "./general-guide";

registerArticles([
  ...interviewArticles1,
  ...interviewArticles2,
  ...roundtableArticles,
  ...guideArticles,
]);
