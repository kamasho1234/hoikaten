# 記事ファイルがまだ無い自治体に、お金の記事だけを持つファイルを新しく作る。
#
# fee-write.py は既にあるファイルに書き足す道具なので、
# 「記事ファイルが無い」で飛ばされた自治体はこちらで作る。
# 作ったら register-all.ts にも import を足す（足さないとページが出ない）。
import importlib.util
import io
import json
import os
import re
import sys

sys.stdout.reconfigure(encoding="utf-8", errors="replace")

ROOT = r"C:/Users/kamas/projects/webapps/hoikuen-simulator"

# 本文の組み立ては fee-write.py と同じものを使う（文面を二重に持たない）
spec = importlib.util.spec_from_file_location(
    "feewrite", os.path.join(ROOT, "scripts", "fee-write.py")
)
fw = importlib.util.module_from_spec(spec)
spec.loader.exec_module(fw)


def var_name(slug):
    # 「aichi-miyoshi」→「aichiMiyoshiArticles」
    parts = re.split(r"[-_]", slug)
    return parts[0] + "".join(p.capitalize() for p in parts[1:]) + "Articles"


def main():
    rows = [json.loads(l) for l in io.open(sys.argv[1], encoding="utf-8") if l.strip()]
    reg_path = os.path.join(ROOT, "src/lib/articles/register-all.ts")
    reg = io.open(reg_path, encoding="utf-8").read()
    made = 0
    for d in rows:
        path = os.path.join(ROOT, "src/lib/articles", f"{d['slug']}.ts")
        if os.path.exists(path):
            print(f"× {d['name']} すでにファイルがある")
            continue
        v = var_name(d["slug"])
        body = (
            'import type { Article } from "./types";\n'
            'import { registerArticles } from "./index";\n\n'
            f"const {v}: Article[] = [\n"
            + fw.build(d)
            + "];\n\n"
            f"registerArticles({v});\n"
        )
        io.open(path, "w", encoding="utf-8", newline="\n").write(body)
        line = f'import "./{d["slug"]}";'
        if line not in reg:
            reg = reg.rstrip("\n") + "\n" + line + "\n"
        made += 1
        print(f"○ {d['name']} 新しく作った")
    io.open(reg_path, "w", encoding="utf-8", newline="\n").write(reg)
    print(f"作った {made}件")


if __name__ == "__main__":
    main()
