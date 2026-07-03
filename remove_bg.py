from rembg import remove

def convert(input_path, output_path):
    with open(input_path, 'rb') as i:
        with open(output_path, 'wb') as o:
            input_data = i.read()
            output_data = remove(input_data)
            o.write(output_data)
            
convert('assets/burgundy_envelope.jpg', 'assets/burgundy_envelope.png')
convert('assets/burgundy_wax_seal.jpg', 'assets/burgundy_wax_seal.png')
print("Done!")
