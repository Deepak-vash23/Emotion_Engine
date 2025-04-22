import sys
import os

# Add the path to KOKO_Ai-main
sys.path.append(os.path.join(os.path.dirname(__file__), 'Backend', 'KOKO_Ai-main'))

# Now import from KOKO_AI.py
import KOKO_AI  # or from KOKO_AI import some_function


from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route('/analyze', methods=['POST'])
def analyze():
    text = request.json['text']
    emotion = get_response(text)
    return jsonify({'emotion': emotion})
