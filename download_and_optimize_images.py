import os
import urllib.request
from io import BytesIO
from PIL import Image

# High quality Unsplash automotive and detailing images
IMAGES = {
    # Hero & Core
    "hero-car.webp": "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=1400&q=80", # Sleek Porsche / sports car
    "about-detailing.webp": "https://images.unsplash.com/photo-1607860108855-64acf2078ed9?auto=format&fit=crop&w=1000&q=80", # Detailing buffer on car
    
    # Services
    "service-exterior-wash.webp": "https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?auto=format&fit=crop&w=800&q=80", # Car wash foam / wash
    "service-interior-clean.webp": "https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=800&q=80", # Luxury interior console
    "service-full-detail.webp": "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=800&q=80", # Flawless supercar finish
    "service-ceramic-coating.webp": "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&w=800&q=80", # Glossy reflection & water beading
    "service-paint-correction.webp": "https://images.unsplash.com/photo-1601362840469-51e4d8d58785?auto=format&fit=crop&w=800&q=80", # Machine polisher
    "service-ppf.webp": "https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&w=800&q=80", # Modern sports car front protection
    "service-headlight.webp": "https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=800&q=80", # Sharp crystal headlight
    "service-engine-bay.webp": "https://images.unsplash.com/photo-1517524008697-84bbe3c3fd98?auto=format&fit=crop&w=800&q=80", # High performance engine
    "service-wax-polish.webp": "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=800&q=80", # Deep reflections & wax
    "service-leather.webp": "https://images.unsplash.com/photo-1553440569-bcc63803a83d?auto=format&fit=crop&w=800&q=80", # Premium leather seats
    
    # Before & After Pairs
    "ba-paint-before.webp": "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=800&q=80", # Matte/dusty finish
    "ba-paint-after.webp": "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=800&q=80", # Deep ultra gloss finish
    "ba-interior-before.webp": "https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=800&q=80", # Vintage worn interior
    "ba-interior-after.webp": "https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=800&q=80", # Pristine refreshed cabin
    "ba-headlight-before.webp": "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=800&q=80", # Hazy headlight
    "ba-headlight-after.webp": "https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=800&q=80", # Clear polished headlight
    "ba-wheel-before.webp": "https://images.unsplash.com/photo-1584345604476-8ec5e12e42dd?auto=format&fit=crop&w=800&q=80", # Dusty muddy tire/wheel
    "ba-wheel-after.webp": "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=800&q=80", # Sparkling clean rim & tire gloss
    
    # Gallery & Featured Vehicles
    "gallery-1.webp": "https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?auto=format&fit=crop&w=800&q=80", # Red performance car
    "gallery-2.webp": "https://images.unsplash.com/photo-1508974239320-0a029497e820?auto=format&fit=crop&w=800&q=80", # Deep metallic reflection
    "gallery-3.webp": "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=800&q=80", # Premium SUV
    "gallery-4.webp": "https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&w=800&q=80", # Sleek cockpit & leather
    "gallery-5.webp": "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?auto=format&fit=crop&w=800&q=80", # Luxury supercar profile
    "gallery-6.webp": "https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&w=800&q=80", # Red sports car studio shot
    
    # Team
    "technician-1.webp": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=500&q=80",
    "technician-2.webp": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=500&q=80",
    "technician-3.webp": "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=500&q=80",
}

target_dir = os.path.join("assets", "images")
os.makedirs(target_dir, exist_ok=True)

headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36'
}

for filename, url in IMAGES.items():
    filepath = os.path.join(target_dir, filename)
    print(f"Downloading {filename}...")
    try:
        req = urllib.request.Request(url, headers=headers)
        with urllib.request.urlopen(req, timeout=12) as response:
            data = response.read()
            img = Image.open(BytesIO(data)).convert("RGB")
            
            # Decide max resolution based on type
            max_width = 1280 if "hero" in filename else 850
            if img.width > max_width:
                height = int(img.height * (max_width / img.width))
                img = img.resize((max_width, height), Image.Resampling.LANCZOS)
            
            # Save as WebP with target under 100KB (e.g. quality 75-80)
            quality = 80
            img.save(filepath, "WEBP", quality=quality, method=6)
            
            size_kb = os.path.getsize(filepath) / 1024
            while size_kb > 98 and quality > 30:
                quality -= 8
                img.save(filepath, "WEBP", quality=quality, method=6)
                size_kb = os.path.getsize(filepath) / 1024
                
            print(f"Saved {filename} ({size_kb:.1f} KB)")
    except Exception as e:
        print(f"Failed {filename}: {e}. Creating fallback image...")
        # Create fallback high tech styled canvas
        w, h = (1200, 675) if "hero" in filename else (800, 500)
        img = Image.new("RGB", (w, h), color=(18, 20, 24))
        img.save(filepath, "WEBP", quality=80)
        print(f"Created fallback for {filename}")

print("\nAll images processed. Summary:")
for f in os.listdir(target_dir):
    fp = os.path.join(target_dir, f)
    if os.path.isfile(fp):
        print(f"{f}: {os.path.getsize(fp)/1024:.1f} KB")
