from PIL import Image

def make_white_transparent(input_path, output_path, threshold=240):
    img = Image.open(input_path).convert("RGBA")
    datas = img.getdata()

    newData = []
    for item in datas:
        # Check if the pixel is white-ish
        if item[0] > threshold and item[1] > threshold and item[2] > threshold:
            newData.append((255, 255, 255, 0)) # transparent
        else:
            newData.append(item)

    img.putdata(newData)
    img.save(output_path, "PNG")

make_white_transparent('assets/burgundy_envelope.jpg', 'assets/burgundy_envelope.png')
make_white_transparent('assets/burgundy_wax_seal.jpg', 'assets/burgundy_wax_seal.png')
print("Done PIL processing")
