import pytest
from legacy_api import app


@pytest.fixture
def client():
    app.config['TESTING'] = True
    with app.test_client() as client:
        yield client


def test_create_user(client):
    response = client.post('/users', json={'name': 'Alice', 'email': 'alice@example.com'})
    assert response.status_code == 201
    data = response.get_json()
    assert data['name'] == 'Alice'
    assert data['role'] == 'user'


def test_get_user(client):
    created = client.post('/users', json={'name': 'Bob', 'email': 'bob@example.com'}).get_json()
    response = client.get(f"/users/{created['id']}")
    assert response.status_code == 200
    assert response.get_json()['name'] == 'Bob'


def test_get_unknown_user_returns_404(client):
    response = client.get('/users/999')
    assert response.status_code == 404


# TODO: test PUT /users/<id> updates name, email, role
# TODO: test PUT /users/<id> returns 404 for unknown user
# TODO: test POST /users/<id>/deactivate sets active to False
# TODO: test POST /users/<id>/deactivate returns 500 for unknown user (current bug — fix it!)
# TODO: test GET /users/search returns matching users
# TODO: test GET /users/search with no query param crashes (current bug — fix it!)
