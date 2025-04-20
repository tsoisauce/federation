from flask import Flask, request, jsonify
import json
import os

app = Flask(__name__)

# Get the schema file
SCHEMA_PATH = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'schema.graphql')

# Read schema file
with open(SCHEMA_PATH, 'r') as f:
    SCHEMA_SDL = f.read()

@app.route('/health', methods=['GET'])
def health_check():
    return jsonify({"status": "ok", "service": "collections-python"})

@app.route('/graphql', methods=['POST'])
def graphql():
    # Parse the request
    data = request.json
    query = data.get('query', '')
    
    # Handle Apollo Federation _service query
    if "_service" in query and "sdl" in query:
        response_data = {
            "data": {
                "_service": {
                    "sdl": SCHEMA_SDL
                }
            }
        }
        return jsonify(response_data)
    
    # For other queries, use a placeholder response just to get federation working
    return jsonify({
        "data": {
            "collections": []
        }
    })

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=3002, debug=True)