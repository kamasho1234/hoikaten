# 後方互換の薄いラッパー。実体は verify-fact-records.py
#   python scripts/verify-shurou-records.py [slug ...]
import os
import subprocess
import sys

here = os.path.dirname(os.path.abspath(__file__))
sys.exit(subprocess.call([sys.executable, os.path.join(here, "verify-fact-records.py"), "shurou", *sys.argv[1:]]))
