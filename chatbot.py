from flask import Flask, request, jsonify, render_template
from flask_cors import CORS
from dotenv import load_dotenv
from google import genai
import os
import traceback

# Read the .env file
load_dotenv()

# Create Flask app
app = Flask(__name__)

client = genai.Client(
    api_key=os.getenv("GEMINI_API_KEY")
)

# Allow JavaScript to communicate with Flask
CORS(app)

@app.route("/")
def home():
    return render_template("frontPage.HTML")

@app.route("/chatbot")
def chatbot_page():
    return render_template("chatbot.html")

@app.route("/music")
def music_page():
    return render_template("music.html")

@app.route("/meditation")
def meditation_page():
    return render_template("meditation.html")

@app.route("/article")
def article_page():
    return render_template("article.html")

@app.route("/about")
def about_page():
    return render_template("about.html")

@app.route("/research")
def research_page():
    return render_template("research.html")


@app.route("/chat", methods=["POST"])
def chat():

    data = request.get_json(silent=True)

    if not data or "message" not in data:
        return jsonify({"reply": "No message received. Please try again."}), 400

    user_message = data["message"].strip()

    if not user_message:
        return jsonify({"reply": "Please type a message."}), 400

    prompt = f"""
You are SANO, an AI mental health assistant.

Rules:
- Be empathetic.
- Never diagnose diseases.
- Keep replies short.
- If someone talks about self-harm or suicide, encourage them to contact trusted people or emergency services.

User:
{user_message}
"""

    try:
        response = client.models.generate_content(
            model="gemini-3.6-flash",
            contents=prompt
        )

        return jsonify({
            "reply": response.text
        })

    except Exception as e:
        traceback.print_exc()          # ← this prints to YOUR terminal only, for debugging
        if "RESOURCE_EXHAUSTED" in str(e) or "429" in str(e):
            return jsonify({
                "reply": "I'm getting a lot of requests right now. Please wait a moment and try again."
            }), 429                     # ← user sees ONLY this friendly message
        return jsonify({
            "reply": "Sorry, I'm having trouble responding right now. Please try again in a moment."
        }), 500

if __name__ == "__main__":
    app.run(debug=True)