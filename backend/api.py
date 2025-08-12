from flask import Flask, jsonify, Response, request
from flask_cors import CORS
from pymongo import MongoClient, errors
from bson.json_util import dumps
from urllib.parse import quote_plus
import certifi

app = Flask(__name__)
CORS(app)

# בניית URI בטוח (מקודד תווים מיוחדים בסיסמה)
user = "orel1234"
password = quote_plus("Orel!1234")  # ! -> %21
uri = f"mongodb+srv://{user}:{password}@main.yidrbi2.mongodb.net/?retryWrites=true&w=majority&appName=main"

# חיבור עם תעודות
client = MongoClient(uri, tls=True, tlsCAFile=certifi.where(), serverSelectionTimeoutMS=20000)

# DB וקולקשן
db = client["database1"]
users_collection = db["user"]  # או "users" אם כך קראת בקונסולה
requests_collection = db["request"]
@app.route("/")
def home():
    return jsonify({"message": "MongoDB Flask API is running!"})

@app.route("/users", methods=["GET"])
def get_users():
    # role = request.args.get("type")       # volunteer / recipient
    # location = request.args.get("location")

    q = {}
    # if role:
    #     q["type"] = role
    # if location:
    #     q["location"] = location  # ודא שבמסמכים השדה באמת נקרא "location"

    cursor = users_collection.find(q).limit(100)
    return Response(dumps(list(cursor)), mimetype="application/json")

# דוגמת POST (אם תרצה להחזיר) – כולל טיפול בשגיאות של מונגו:
@app.route("/newUser", methods=["POST"])
def create_user():
    data = request.get_json(force=True) or {}
    if not data.get("name") or not data.get("number"):
        return {"ok": False, "error": "name and number are required"}, 400
    try:
        res = users_collection.insert_one(data)
        doc = users_collection.find_one({"_id": res.inserted_id})
        return Response(dumps(doc), mimetype="application/json", status=201)
    except errors.DuplicateKeyError:
        return {"ok": False, "error": "duplicate key"}, 409
    except Exception as e:
        return {"ok": False, "error": str(e)}, 500


@app.route("/requests", methods=["GET"])
def get_requests():
    # role = request.args.get("type")       # volunteer / recipient
    # location = request.args.get("location")

    q = {}
    # if role:
    #     q["type"] = role
    # if location:
    #     q["location"] = location  # ודא שבמסמכים השדה באמת נקרא "location"

    cursor = requests_collection.find(q).limit(100)
    return Response(dumps(list(cursor)), mimetype="application/json")

# דוגמת POST (אם תרצה להחזיר) – כולל טיפול בשגיאות של מונגו:
@app.route("/newrequests", methods=["POST"])
def create_requests():
    data = request.get_json(force=True) or {}
    # if not data.get("name") or not data.get("number"):
    #     return {"ok": False, "error": "name and number are required"}, 400
    try:
        res = requests_collection.insert_one(data)
        doc = requests_collection.find_one({"_id": res.inserted_id})
        return Response(dumps(doc), mimetype="application/json", status=201)
    except errors.DuplicateKeyError:
        return {"ok": False, "error": "duplicate key"}, 409
    except Exception as e:
        return {"ok": False, "error": str(e)}, 500



if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
