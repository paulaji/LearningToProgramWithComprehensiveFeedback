import os
from flask import Flask, jsonify, request
from flask_cors import CORS
from dotenv import load_dotenv
load_dotenv()

from groq import Groq

app = Flask(__name__)

CORS(app, origins=["http://localhost:3000"])

api_key = os.getenv("GROQ_API_KEY")
client = Groq(api_key=api_key)

@app.route('/')
def home():
    return "Welcome to the Flask App!"

@app.route('/getproblemstatement')
def get_problem_statement():
    topic = request.args.get('topic', default=None)
    topic_description = request.args.get('description', default=None)
    topic_difficulty = request.args.get('difficulty', default=None)
    print(f"Called with topic: {topic} - {topic_difficulty} - {topic_description}")

    # Question
    chat_completion = client.chat.completions.create(
    messages=[
        {
            "role": "system",
            "content": "You are a Python programming language teacher."
        },
        {
            "role": "user",
            "content": f"Generate a plain programming question for topic: {topic}, description: {topic_description}, difficulty: {topic_difficulty}. No explanation or formatting, only the question text.",
        }
    ],
    model="llama-3.3-70b-versatile",
    )
    print("Question is: ", chat_completion.choices[0].message.content)
    question = chat_completion.choices[0].message.content

    # Answer
    chat_completion = client.chat.completions.create(
    messages=[
        {
            "role": "system",
            "content": "You provide Python solutions to coding problems."
        },
        {
            "role": "user",
            "content": f"Generate a plain programming answer for the question: {question}. No explanation or formatting, only the answer text.",
        }
    ],
    model="llama-3.3-70b-versatile",
    )
    print("Answer is: ", chat_completion.choices[0].message.content)
    answer = chat_completion.choices[0].message.content

    return jsonify({
        "question": str(question),
        "answer": str(answer)
    })



if __name__ == '__main__':
    app.run(debug=True)