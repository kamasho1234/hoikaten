import { notFound } from "next/navigation";
import { getMunicipalityData } from "@/lib/data";
import { SimulatorForm } from "./simulator-form";

export default async function CityPage({
  params,
}: {
  params: Promise<{ city: string }>;
}) {
  const { city } = await params;
  const data = getMunicipalityData(city);
  if (!data) notFound();

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold mb-2">
          {data.municipality.name}の保育園、何点とれる？
        </h2>
        <p className="text-muted-foreground">
          かんたんな質問に答えるだけで、入園点数の目安がわかります
        </p>
        <p className="text-xs text-muted-foreground mt-1">
          {data.municipality.scoringMethod === "min"
            ? "保護者の低い方のランク＋調整指数で判定されます"
            : `保護者1・保護者2の合計で最大${data.municipality.maxBasePoints}点`}
        </p>
      </div>
      <SimulatorForm data={data} />
    </div>
  );
}
