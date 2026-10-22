"""Génère apercu.html : la page sans squelette <html>/<head>, pour la publier en Artifact claude.ai."""
import re, pathlib
racine = pathlib.Path(__file__).resolve().parent.parent
src = (racine / "index.html").read_text(encoding="utf-8")
corps = re.search(r"<!-- APP:DEBUT -->(.*)<!-- APP:FIN -->", src, re.S).group(1)
scripts = "\n".join(re.findall(r'<script[^>]*>.*?</script>', src.split("<!-- APP:FIN -->")[1], re.S))
liens = "\n".join(l for l in re.findall(r"<link [^>]+>", src) if "stylesheet" in l)
page = f"""<title>Aiguillage</title>
<meta name="claude:viewport-fit-sides" content="cover">
{liens}
{corps}
{scripts}
"""
(racine / "apercu.html").write_text(page, encoding="utf-8")
print("apercu.html généré")
