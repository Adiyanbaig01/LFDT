from PIL import Image
import os

def compress_image(input_path, output_path, target_height=200):
    """
    Compress an image to a target height while preserving aspect ratio
    
    Args:
        input_path (str): Path to the input image
        output_path (str): Path to save the compressed image
        target_height (int): Target height in pixels (default: 200)
    """
    try:
        # Open the image
        with Image.open(input_path) as img:
            # Get original dimensions
            original_width, original_height = img.size
            print(f"Original dimensions: {original_width}x{original_height}")
            
            # Calculate new width to maintain aspect ratio
            aspect_ratio = original_width / original_height
            new_width = int(target_height * aspect_ratio)
            
            print(f"New dimensions: {new_width}x{target_height}")
            
            # Resize the image
            resized_img = img.resize((new_width, target_height), Image.Resampling.LANCZOS)
            
            # Save the compressed image
            resized_img.save(output_path, optimize=True, quality=95)
            
            print(f"Image successfully compressed and saved to: {output_path}")
            
            # Show file size comparison
            original_size = os.path.getsize(input_path)
            compressed_size = os.path.getsize(output_path)
            compression_ratio = (1 - compressed_size/original_size) * 100
            
            print(f"Original file size: {original_size:,} bytes")
            print(f"Compressed file size: {compressed_size:,} bytes")
            print(f"Compression: {compression_ratio:.1f}% reduction")
            
    except FileNotFoundError:
        print(f"Error: File '{input_path}' not found.")
    except Exception as e:
        print(f"Error processing image: {str(e)}")

if __name__ == "__main__":
    # Define input and output paths
    input_file = "ind.png"
    output_file = "ind_compressed.png"
    
    # Check if input file exists
    if os.path.exists(input_file):
        compress_image(input_file, output_file, target_height=200)
    else:
        print(f"Error: '{input_file}' not found in the current directory.")
        print("Available files:")
        for file in os.listdir('.'):
            if file.lower().endswith(('.png', '.jpg', '.jpeg', '.gif', '.bmp')):
                print(f"  - {file}")
