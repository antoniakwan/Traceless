from flask import Flask, jsonify, request
from flask_cors import CORS
import os
from google import genai
from PIL import Image, ImageDraw, ImageFont
import imageAnalyze.gem as gem

app = Flask(__name__)
# CORS(app)  # Enable CORS for all routes
# CORS(app, origins=["http://localhost:5173"])
CORS(app, resources={r"/analyze": {"origins": "http://localhost:5173"}})

UPLOAD_FOLDER = './uploads'
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

# Configure Flask to use the upload folder
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

@app.route('/analyze')
def index():
    # Sample data to send as JSON
    data = {
        'message': 'Hello from Flask, here we are, very good.',
        # 'status': 'success',
        # 'data': {
        #     'id': 1,
        #     'name': 'Sample Item'
        # }
    }
    
    return jsonify(data)

@app.route('/upload', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return 'No file part', 400
    
    file = request.files['file']
    
    # If no file is selected
    if file.filename == '':
        return 'No selected file', 400
    
    # Save the file to the defined folder
    file_path = os.path.join(app.config['UPLOAD_FOLDER'], file.filename)
    file.save(file_path)
    return "You did great", 200

@app.route('/analyze', methods=['POST'])
def analyze():
    if 'file' not in request.files:
        return 'No file part', 400
    
    file = request.files['file']
    
    # If no file is selected
    if file.filename == '':
        return 'No selected file', 400
    
    # Save the file to the defined folder
    file_path = os.path.join(app.config['UPLOAD_FOLDER'], file.filename)
    file.save(file_path)

    return gem.analyzeImage(file_path), 200


def add_watermark(input_image_path, output_image_path, watermark_text):
    # Open the image
    image = Image.open(input_image_path).convert("RGBA")
    
    # Create a drawing context
    draw = ImageDraw.Draw(image)
    
    # Use a built-in font or specify the path to a font
    font = ImageFont.load_default(30)
    
    # Get the width and height of the image
    width, height = image.size
    
    # Get the width and height of the text to be drawn
    # text_width, text_height = draw.textsize(watermark_text, font=font)
    
    # Calculate position: Top-left corner
    position = (0, 0)
    # position = (width - text_width - 10, height - text_height - 10)
    
    # Add the watermark text
    draw.text(position, watermark_text, font=font, fill=(255, 255, 255, 128))  # White with transparency
    
    # Save the result
    image.convert('RGB').save(output_image_path)

# Example usage


if __name__ == '__main__':
    app.run(debug=True, host='127.0.0.1', port=5000)
