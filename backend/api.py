from flask import Flask, jsonify, Response
from flask_cors import CORS
from pymongo import MongoClient
from bson.json_util import dumps  # <<< להמרת ObjectId ל-JSON
import os

app = Flask(__name__)
CORS(app)

# חיבור ל־MongoDB Atlas
MONGO_URI = "mongodb+srv://orel1234:Orel!1234@main.yidrbi2.mongodb.net/?retryWrites=true&w=majority&appName=main"
client = MongoClient(MONGO_URI)

# בחירת בסיס נתונים ואוסף (לפי מה שמופיע ב-Atlas)
db = client["sample_mflix"]
comments_collection = db["comments"]

@app.route("/")
def home():
    return jsonify({"message": "MongoDB Flask API is running!"})

@app.route("/comments")
def get_comments():
    # לא מסתירים שדות – נותנים ל-dumps לטפל ב-ObjectId
    cursor = comments_collection.find({}, {}).limit(5)
    return Response(dumps(list(cursor)), mimetype="application/json")

if __name__ == "__main__":
    app.run(debug=True)
