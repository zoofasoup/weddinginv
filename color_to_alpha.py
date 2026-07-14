from PIL import Image

def color_to_alpha(input_path, output_path, bg_color=(250, 248, 243)):
    img = Image.open(input_path).convert("RGB")
    data = img.getdata()
    
    new_data = []
    bg_r, bg_g, bg_b = bg_color
    
    for r, g, b in data:
        # Normalize to background color being white
        r_adj = min(255, int(r * 255 / bg_r))
        g_adj = min(255, int(g * 255 / bg_g))
        b_adj = min(255, int(b * 255 / bg_b))
        
        min_adj = min(r_adj, g_adj, b_adj)
        
        if min_adj >= 253:  # close enough to background
            new_data.append((0, 0, 0, 0))
        else:
            alpha = 255 - min_adj
            # Un-premultiply
            f_r = int((r_adj - min_adj) * 255 / alpha)
            f_g = int((g_adj - min_adj) * 255 / alpha)
            f_b = int((b_adj - min_adj) * 255 / alpha)
            
            # Boost alpha slightly for watercolor vibrance
            alpha = min(255, int(alpha * 1.3))
            
            # Constrain F to 0-255
            f_r = max(0, min(255, f_r))
            f_g = max(0, min(255, f_g))
            f_b = max(0, min(255, f_b))
            
            new_data.append((f_r, f_g, f_b, alpha))
            
    img = Image.new("RGBA", img.size)
    img.putdata(new_data)
    img.save(output_path, "PNG")

print("Processing images...")
color_to_alpha("assets/watercolor_header.jpg", "assets/watercolor_header.png")
color_to_alpha("assets/watercolor_footer.jpg", "assets/watercolor_footer.png")
color_to_alpha("assets/watercolor_divider.jpg", "assets/watercolor_divider.png")
print("Done!")
