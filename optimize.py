from PIL import Image
import os

assets_dir = "assets"
max_width = 800

total_saved = 0
for filename in os.listdir(assets_dir):
    if filename.endswith(".jpg") or filename.endswith(".png"):
        path = os.path.join(assets_dir, filename)
        orig_size = os.path.getsize(path)
        
        try:
            img = Image.open(path)
            # Calculate new size if it exceeds max_width
            if img.width > max_width:
                ratio = max_width / img.width
                new_size = (max_width, int(img.height * ratio))
                img = img.resize(new_size, Image.Resampling.LANCZOS)
            
            # Save optimized
            if filename.endswith(".jpg"):
                img.save(path, "JPEG", quality=80, optimize=True)
            elif filename.endswith(".png"):
                img.save(path, "PNG", optimize=True)
                
            new_size_b = os.path.getsize(path)
            saved = orig_size - new_size_b
            total_saved += saved
            print(f"Optimized {filename}: {orig_size//1024}KB -> {new_size_b//1024}KB (Saved {saved//1024}KB)")
        except Exception as e:
            print(f"Error processing {filename}: {e}")

print(f"\nTotal space saved: {total_saved / 1024 / 1024:.2f} MB")
