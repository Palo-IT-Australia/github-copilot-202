from flask import Flask, request, jsonify
import json

app = Flask(__name__)

users = {}
next_id = 1


@app.route('/users', methods=['GET'])
def get_users():
    try:
        return jsonify(list(users.values()))
    except:
        return jsonify({'error': 'something went wrong'}), 500


@app.route('/users/<id>', methods=['GET'])
def get_user(id):
    user = users.get(int(id))
    if not user:
        return 'not found', 404
    return jsonify(user)


@app.route('/users', methods=['POST'])
def create_user():
    global next_id
    data = request.json
    # no input validation
    user = {
        'id': next_id,
        'name': data['name'],
        'email': data['email'],
        'role': data.get('role', 'user'),
        'active': True
    }
    users[next_id] = user
    next_id += 1
    return jsonify(user), 201


@app.route('/users/<id>', methods=['PUT'])
def update_user(id):
    try:
        user = users.get(int(id))
        if not user:
            return jsonify({'msg': 'User not found'}), 404
        data = request.json
        if 'name' in data:
            user['name'] = data['name']
        if 'email' in data:
            user['email'] = data['email']
        if 'role' in data:
            user['role'] = data['role']
        users[int(id)] = user
        return jsonify(user)
    except Exception as e:
        print(e)
        return 'error', 500


@app.route('/users/<id>/deactivate', methods=['POST'])
def deactivate(id):
    user = users.get(int(id))
    user['active'] = False  # will crash with AttributeError if user doesn't exist
    return jsonify({'status': 'ok'})


@app.route('/users/search', methods=['GET'])
def search():
    q = request.args.get('q')
    results = []
    for u in users.values():
        if q.lower() in u['name'].lower() or q.lower() in u['email'].lower():
            results.append(u)
    return json.dumps(results)  # inconsistent: using json.dumps instead of jsonify


if __name__ == '__main__':
    app.run(debug=True)
