import { registerArticles } from "../index";
import { buildHokatsuArticle } from "./build";
import { hokatsuRecords } from "./records";

registerArticles(hokatsuRecords.map(buildHokatsuArticle));
