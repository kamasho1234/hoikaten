"""自治体の点数表（指数表）から、シミュレーターのデータファイルを作る。

## なぜ作るか

データファイルは自治体ごとに200行以上あるが、その中身は
「保育が必要な理由ごとの選択肢と点数」と「調整項目と点数」だけで決まる。
手で書くと写し間違いが起きるうえ、1自治体あたりの手間が大きい。
**表を写した仕様（JSON）から機械で書き出す**ことで、
人が確かめるのは「点数が原典どおりか」だけにする。

## 仕様（JSON）の形

{
  "slug": "toki", "name": "土岐市", "prefecture": "岐阜県",
  "maxBasePoints": 20,
  "scoringMethod": "min",          # 省略時は加算（sum）
  "source": {"title": "…指数表", "url": "https://…"},
  "notes": ["ファイル冒頭に書く説明（原典の読み方・注意点）"],
  "baseHelp": "保育が必要な理由の質問に出す補足",
  "reasons": [
    {"key": "employment", "label": "就労している",
     "question": "の就労の状況は？", "help": "…",
     "options": [["月150時間以上", 10], ["月120時間以上", 8]]}
  ],
  "adjustments": [
    {"id": "single_parent", "label": "ひとり親世帯ですか？",
     "help": "…",
     "options": [["いいえ", 0], ["はい（+15）", 15]]}
  ]
}

使い方: python scripts/make-municipality-data.py <仕様.json>
"""

import io
import json
import os
import re
import sys


def q(text: str) -> str:
    """TypeScript のシングルクォート文字列にする"""
    return "'" + text.replace("\\", "\\\\").replace("'", "\\'") + "'"


def option_lines(prefix_expr: str, key: str, options, indent: str) -> str:
    out = []
    seen = set()
    for i, (label, points) in enumerate(options):
        # 同じ点数の選択肢が並ぶ表があるので、値が重ならないよう連番を足す
        value = f"{key}_{i}"
        assert value not in seen
        seen.add(value)
        out.append(
            f"{indent}{{ label: {q(label)}, value: `${{{prefix_expr}}}_{value}`, points: {points} }},"
        )
    return "\n".join(out)


def build(spec: dict) -> str:
    name = spec["name"]
    reasons = spec["reasons"]
    lines = []
    lines.append("import type { MunicipalityData, Question } from '../types';")
    lines.append("")
    lines.append("// " + "-" * 73)
    lines.append(f"// {name} 保育園入園 利用調整基準データ")
    lines.append(f"// 出典: {name}「{spec['source']['title']}」")
    lines.append(f"// {spec['source']['url']}")
    lines.append("// " + "-" * 73)
    for note in spec.get("notes", []):
        lines.append(f"// {note}")
    lines.append("// " + "-" * 73)
    lines.append("")
    lines.append("const municipality = {")
    lines.append(f"  id: {q(spec['slug'])},")
    lines.append(f"  name: {q(name)},")
    lines.append(f"  slug: {q(spec['slug'])},")
    lines.append(f"  prefecture: {q(spec['prefecture'])},")
    lines.append(f"  maxBasePoints: {spec['maxBasePoints']},")
    if spec.get("scoringMethod"):
        lines.append(f"  scoringMethod: {q(spec['scoringMethod'])},")
    if spec.get("baseCap"):
        lines.append(f"  baseCap: {spec['baseCap']},")
    lines.append("} as const;")
    lines.append("")

    for r in reasons:
        key = r["key"]
        lines.append(f"const {key}Options = (prefix: string) => [")
        lines.append(f"  {{ label: 'あてはまらない', value: `${{prefix}}_{key}_none`, points: 0 }},")
        lines.append(option_lines("prefix", key, r["options"], "  "))
        lines.append("];")
        lines.append("")

    lines.append("function buildParentQuestions(parentNum: 1 | 2): Question[] {")
    lines.append("  const prefix = `parent${parentNum}`;")
    lines.append("  const category = `parent${parentNum}_base` as const;")
    lines.append("  const parentLabel = parentNum === 1 ? '保護者1' : '保護者2';")
    lines.append("")
    lines.append("  const reasonQuestion: Question = {")
    lines.append("    id: `${prefix}_reason`,")
    lines.append("    category,")
    lines.append("    label: `${parentLabel}：保育が必要な理由`,")
    if spec.get("baseHelp"):
        lines.append(f"    helpText: {q(spec['baseHelp'])},")
    lines.append("    inputType: 'select',")
    lines.append("    options: [")
    for r in reasons:
        lines.append(
            f"      {{ label: {q(r['label'])}, value: `${{prefix}}_reason_{r['key']}`, points: 0 }},"
        )
    lines.append("    ],")
    lines.append("  };")
    lines.append("")
    lines.append("  const detailQuestions: Question[] = [")
    for r in reasons:
        lines.append("    {")
        lines.append(f"      id: `${{prefix}}_{r['key']}`,")
        lines.append("      category,")
        lines.append(f"      label: `${{parentLabel}}{r['question']}`,")
        if r.get("help"):
            lines.append(f"      helpText: {q(r['help'])},")
        lines.append("      inputType: 'radio',")
        lines.append(f"      options: {r['key']}Options(prefix),")
        lines.append("    },")
    lines.append("  ];")
    lines.append("")
    lines.append("  return [reasonQuestion, ...detailQuestions];")
    lines.append("}")
    lines.append("")

    lines.append("const adjustmentQuestions: Question[] = [")
    for a in spec["adjustments"]:
        lines.append("  {")
        lines.append(f"    id: 'adj_{a['id']}',")
        lines.append("    category: 'adjustment',")
        lines.append(f"    label: {q(a['label'])},")
        if a.get("help"):
            lines.append(f"    helpText: {q(a['help'])},")
        lines.append("    inputType: 'radio',")
        lines.append("    options: [")
        for i, (label, points) in enumerate(a["options"]):
            lines.append(
                f"      {{ label: {q(label)}, value: 'adj_{a['id']}_{i}', points: {points} }},"
            )
        lines.append("    ],")
        lines.append("  },")
    lines.append("];")
    lines.append("")

    var = re.sub(r"-(\w)", lambda m: m.group(1).upper(), spec["slug"]) + "Data"
    lines.append(f"export const {var}: MunicipalityData = {{")
    lines.append("  municipality,")
    lines.append("  questions: [")
    lines.append("    ...buildParentQuestions(1),")
    lines.append("    ...buildParentQuestions(2),")
    lines.append("    ...adjustmentQuestions,")
    lines.append("  ],")
    lines.append("};")
    return "\n".join(lines) + "\n"


def register(slug: str) -> None:
    """src/lib/data/index.ts に import と登録行を足す"""
    path = os.path.join(os.path.dirname(__file__), "..", "src", "lib", "data", "index.ts")
    path = os.path.normpath(path)
    s = io.open(path, encoding="utf-8").read()
    var = re.sub(r"-(\w)", lambda m: m.group(1).upper(), slug) + "Data"
    if f"import {{ {var} }}" in s:
        print(f"  {slug} は登録済みです")
        return
    anchor_import = "import { abikoData } from './abiko';"
    anchor_map = "  [abikoData.municipality.slug]: abikoData,"
    assert anchor_import in s and anchor_map in s
    s = s.replace(anchor_import, f"{anchor_import}\nimport {{ {var} }} from './{slug}';", 1)
    s = s.replace(anchor_map, f"{anchor_map}\n  [{var}.municipality.slug]: {var},", 1)
    io.open(path, "w", encoding="utf-8", newline="\n").write(s)


def main(spec_path: str) -> None:
    spec = json.load(io.open(spec_path, encoding="utf-8"))
    out = os.path.join(os.path.dirname(__file__), "..", "src", "lib", "data", spec["slug"] + ".ts")
    out = os.path.normpath(out)
    io.open(out, "w", encoding="utf-8", newline="\n").write(build(spec))
    register(spec["slug"])
    n = sum(len(r["options"]) for r in spec["reasons"]) + sum(len(a["options"]) for a in spec["adjustments"])
    print(f"書きました {spec['slug']}（選択肢 {n} 個）")


if __name__ == "__main__":
    for p in sys.argv[1:]:
        main(p)
