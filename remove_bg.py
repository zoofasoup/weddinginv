from PIL import Image
import os

def make_transparent(input_path, output_path):
    print(f"Processing {input_path}...")
    if not os.path.exists(input_path):
        print(f"File not found: {input_path}")
        return
        
    img = Image.open(input_path).convert("RGBA")
    data = img.getdata()
    
    new_data = []
    for item in data:
        intensity = (item[0] * 0.3 + item[1] * 0.59 + item[2] * 0.11)
        if intensity > 235:
            # 235 -> 255 alpha (opaque), 250 -> 0 alpha (transparent)
            alpha = int(255 - ((intensity - 235) / 15 * 255))
            if alpha < 0: alpha = 0
            if alpha > 255: alpha = 255
            new_data.append((item[0], item[1], item[2], alpha))
        else:
            new_data.append(item)
            
    img.putdata(new_data)
    img.save(output_path, "PNG")
    print(f"Saved {output_path}")

make_transparent("assets/watercolor_header.jpg", "assets/watercolor_header.png")
make_transparent("assets/watercolor_footer.jpg", "assets/watercolor_footer.png")
make_transparent("assets/watercolor_divider.jpg", "assets/watercolor_divider.png")
