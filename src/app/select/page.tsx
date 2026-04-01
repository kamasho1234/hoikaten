import { getAllMunicipalities } from "@/lib/data";
import { CitySearch } from "@/components/city-search";

export default function SelectPage() {
  const municipalities = getAllMunicipalities();

  return (
    <div className="mx-auto max-w-2xl px-4 py-10">
      <div className="text-center mb-8">
        <h2
          className="text-xl font-bold mb-2"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          お住まいの地域をえらんでください
        </h2>
        <p className="text-sm text-muted-foreground">
          地域をえらぶと、すぐに診断が始まります
        </p>
      </div>

      <div className="mb-8">
        <CitySearch
          municipalities={municipalities.map((m) => ({
            name: m.name,
            slug: m.slug,
            prefecture: m.prefecture,
          }))}
        />
      </div>

      <div className="text-center mb-3">
        <p className="text-xs text-muted-foreground font-medium">
          または地域を選択
        </p>
      </div>
      <div className="flex flex-wrap justify-center gap-2">
        {municipalities.map((m) => (
          <a
            key={m.slug}
            href={`https://${m.slug}.hoikaten.com`}
            className="px-4 py-2 text-sm rounded-full border border-border/60 bg-card hover:border-primary/40 hover:text-primary hover:shadow-sm transition-all"
          >
            {m.name}
          </a>
        ))}
      </div>
      <p className="text-center text-[11px] text-muted-foreground mt-3">
        続々追加中
      </p>
    </div>
  );
}
