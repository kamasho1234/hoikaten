import { registerArticles } from "../index";
import { getAllMunicipalities } from "../../data";
import { buildScoringGuideArticle } from "./build";
import type { Article } from "../types";

// 出典URLが分かる自治体（sources.json にある自治体）だけ記事を作る
const articles = getAllMunicipalities()
  .map((m) => buildScoringGuideArticle(m.slug))
  .filter((a): a is Article => a !== undefined);

registerArticles(articles);
