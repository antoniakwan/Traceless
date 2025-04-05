from flask import Flask, jsonify, request
from flask_cors import CORS
import os

app = Flask(__name__)
# CORS(app)  # Enable CORS for all routes
CORS(app, origins=["http://localhost:5173"])

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

if __name__ == '__main__':
    app.run(debug=True, host='127.0.0.1', port=5000)
