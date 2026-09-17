import { registerArticles } from "../index";
import { buildShurouArticle } from "./build";
import { shurouRecords } from "./records";

registerArticles(shurouRecords.map(buildShurouArticle));
