import { getAllMunicipalities } from "@/lib/data";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

export default function Home() {
  const municipalities = getAllMunicipalities();

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <div className="text-center mb-10">
        <h2 className="text-2xl font-bold mb-3">
          うちは何点とれる？
        </h2>
        <p className="text-muted-foreground">
          お住まいの地域を選んで、かんたんな質問に答えるだけ。
          <br />
          保育園に入るための点数の目安がすぐわかります。
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {municipalities.map((m) => (
          <a key={m.slug} href={`https://${m.slug}.hoikaten.com`}>
            <Card className="hover:border-primary/50 hover:shadow-md transition-all cursor-pointer">
              <CardHeader>
                <CardDescription>{m.prefecture}</CardDescription>
                <CardTitle className="text-xl">{m.name}</CardTitle>
                <CardDescription>
                  {m.scoringMethod === "min"
                    ? `ランクA〜I + 調整指数`
                    : `最大${m.maxBasePoints}点`}
                </CardDescription>
              </CardHeader>
            </Card>
          </a>
        ))}

        <Card className="border-dashed opacity-60">
          <CardHeader>
            <CardDescription>準備中</CardDescription>
            <CardTitle className="text-xl text-muted-foreground">
              ほかの地域
            </CardTitle>
            <CardDescription>どんどん追加していきます</CardDescription>
          </CardHeader>
        </Card>
      </div>
    </div>
  );
}
