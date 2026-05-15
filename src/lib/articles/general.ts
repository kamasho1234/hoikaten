import { registerArticles } from "./index";
import { interviewArticles1 } from "./general-interview-1";
import { interviewArticles2 } from "./general-interview-2";
import { roundtableArticles } from "./general-roundtable";
import { guideArticles } from "./general-guide";
import { columnArticles1 } from "./general-column-1";
import { columnArticles2 } from "./general-column-2";

registerArticles([
  ...interviewArticles1,
  ...interviewArticles2,
  ...roundtableArticles,
  ...guideArticles,
  ...columnArticles1,
  ...columnArticles2,
]);
