from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

@app.route('/')
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

if __name__ == '__main__':
    app.run(debug=True, host='127.0.0.1', port=5000)
