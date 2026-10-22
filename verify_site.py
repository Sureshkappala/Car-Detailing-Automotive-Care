import os
import re
from html.parser import HTMLParser

ROOT_DIR = r"c:\Car Detailing & Automotive Care"

html_files = [f for f in os.listdir(ROOT_DIR) if f.endswith(".html")]
print(f"Found {len(html_files)} HTML pages: {html_files}")

errors = []
warnings = []

for hf in html_files:
    path = os.path.join(ROOT_DIR, hf)
    with open(path, "r", encoding="utf-8") as f:
        content = f.read()

    # Check for linked images
    img_srcs = re.findall(r'<img[^>]+src=["\']([^"\']+)["\']', content)
    for src in img_srcs:
        if not src.startswith("http") and not src.startswith("data:"):
            # Check local file
            full_img_path = os.path.normpath(os.path.join(ROOT_DIR, src))
            if not os.path.exists(full_img_path):
                errors.append(f"[{hf}] Broken image path: {src}")
            else:
                sz = os.path.getsize(full_img_path)
                if sz > 102400: # 100 KB
                    errors.append(f"[{hf}] Image {src} exceeds 100KB: {sz/1024:.1f} KB")

    # Check internal page links
    hrefs = re.findall(r'<a[^>]+href=["\']([^"\'#]+)["\']', content)
    for h in hrefs:
        # Strip query params
        clean_h = h.split("?")[0]
        if clean_h and not clean_h.startswith("http") and not clean_h.startswith("tel:") and not clean_h.startswith("mailto:"):
            target_path = os.path.normpath(os.path.join(ROOT_DIR, clean_h))
            if not os.path.exists(target_path):
                errors.append(f"[{hf}] Broken link: href='{h}'")

print("\n--- LINK & IMAGE AUDIT RESULTS ---")
if errors:
    print(f"FAILED with {len(errors)} errors:")
    for err in errors:
        print("  - " + err)
else:
    print("[SUCCESS] All images and internal links are 100% valid and existing!")
    print("[SUCCESS] All images strictly under 100KB!")
