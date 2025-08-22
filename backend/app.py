# Commenting here - eg. like using llama 
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
            "content": f"Generate a python programming answer for the question: {question}. No explanation, only the python formatted answer text. Please provide the final answer too. Please try to provide diverse and different questions. We have to create a learning experience for the students. Don't try to stick to a niche.",
        }
    ],
    model="llama-3.3-70b-versatile",
    )
    print("Answer is: ", chat_completion.choices[0].message.content)
    answer = chat_completion.choices[0].message.content

    # Tips & Hints
    chat_completion = client.chat.completions.create(
    messages=[
        {
            "role": "system",
            "content": "You provide Python tips and hints to coding problems."
        },
        {
            "role": "user",
            "content": f"Generate a plain text programming tips and hints for the question: {question} and the answer: {answer}. No explanation or formatting, only the tips and hints text - but you can give in proper paragraph format like capitalizing the first letter, full stop after sentences and all. Please keep this small and concise. You can give a small example too which is not very obvious, but yeah which can help.",
        }
    ],
    model="llama-3.3-70b-versatile",
    )
    print("Tips and Suggestions are: ", chat_completion.choices[0].message.content)
    tip_and_suggestions = chat_completion.choices[0].message.content

    # Short Question Brief
    chat_completion = client.chat.completions.create(
    messages=[
        {
            "role": "system",
            "content": "You provide text briefs and one-liners."
        },
        {
            "role": "user",
            "content": f"Generate a small question statement and not an answer one-liner or one-worder brief for the question - {question}. The question brief should be smaller than the question.",
        }
    ],
    model="llama-3.3-70b-versatile",
    )
    print("The question brief is ", chat_completion.choices[0].message.content)
    question_brief = chat_completion.choices[0].message.content

    return jsonify({
        "question": str(question),
        "answer": str(answer),
        "tips_and_suggestions": str(tip_and_suggestions),
        "question_brief": str(question_brief),
    })

@app.route('/getfeedback', methods=['POST'])
def feedback():
    data = request.get_json()

    result = data.get('result')
    code = data.get('code')
    answer = data.get('answer')

    print(f"Result: {result}")
    print(f"Code: {code}")
    print(f"Answer: {answer}")

    chat_completion = client.chat.completions.create(
    messages=[
        {
            "role": "system",
            "content": "You provide feedbacks as plain text, no need text decorations such as bolding or italics."
        },
        {
            "role": "user",
            "content": f"Generate a feedback statement by comparing the {code} and {answer}. Always give feedback on the {code} because that it is what the user is giving. The {answer} is AI generated and the user {code} should be compared with the {answer} How can it be improved or is it already good enough.",
        }
    ],
    model="llama-3.3-70b-versatile",
    )
    print("The feedback is ", chat_completion.choices[0].message.content)
    feedback = chat_completion.choices[0].message.content

    return jsonify({"feedback": feedback})

@app.route('/geterrorfeedback', methods=['POST'])
def errorfeedback():
    data = request.get_json()

    error = data.get('err')
    answer = data.get('answer')

    chat_completion = client.chat.completions.create(
    messages=[
        {
            "role": "system",
            "content": "You provide feedbacks as plain text, no need text decorations such as bolding or italics."
        },
        {
            "role": "user",
            "content": f"Generate a feedback statement regarding the {error} - error statement. The correct AI generated answer is {answer}. Give a feedback as to how to tackle this error too. No need to mention the error lines.",
        }
    ],
    model="llama-3.3-70b-versatile",
    )
    print("The feedback is ", chat_completion.choices[0].message.content)
    feedback = chat_completion.choices[0].message.content

    return jsonify({"feedback": feedback})

if __name__ == '__main__':
    app.run(debug=True)