import { registerArticles } from "../index";
import { buildIchijiArticle } from "./build";
import { ichijiRecords } from "./records";

registerArticles(ichijiRecords.map(buildIchijiArticle));
