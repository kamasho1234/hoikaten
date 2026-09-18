# 後方互換の薄いラッパー。実体は gen-fact-index.py
import os, subprocess, sys
sys.exit(subprocess.call([sys.executable, os.path.join(os.path.dirname(os.path.abspath(__file__)), "gen-fact-index.py"), "shurou"]))
