from flask import Flask, jsonify
from flask_cors import CORS
import openai
from google import genai
import json
import re

app = Flask(__name__)

CORS(app, origins=["http://localhost:3000"])

openai.api_key = "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"
# google_ai = genai.Client(api_key="AIzaSyAhOzjWLhVy3N_NwCq_C7O2gsIBbl51gnM")

@app.route('/')
def home():
    return "Welcome to the Flask App!"

@app.route('/get_question', methods=['GET'])
def get_question():
    print("Questions API called")
    prompt_question = (
    """Generate beginner-level Python programming questions that involve basic math operations (addition, subtraction, multiplication, or division). Each question should require writing actual Python code to get the final answer (e.g., using variables, expressions, or simple functions). The operations should not be solvable instantly by mental math or a calculator — there should be at least one step of reasoning or computation.

Provide the question in plain text followed by the exact final numerical answer (as a float or integer) on a new line.

Example format (do not include labels like “Q:” or “A:”):

Write a Python function that takes two numbers, adds them, and multiplies the result by 2. Use the numbers 4 and 5.
18

Do not explain or format anything. Just give the plain text question followed by the numeric answer.

Just one question. Please don't just give me mathematical questions. I need my students to use learn Python and not mathematics.
"""
)

    try:
        response = openai.ChatCompletion.create(
            model="gpt-4o-mini",  # or "gpt-4" or "gpt-3.5-turbo"
            messages=[
                {"role": "system", "content": "You are a helpful assistant."},
                {"role": "user", "content": prompt_question}
            ],
            max_tokens=50,
            temperature=0.7,
            n=1,
        )

        question = response.choices[0].message['content'].strip()
    except Exception as e:
        print("OpenAI API error:", e)
        question = "Error generating Question."
    print("OpenAI generated question is: ", question)
    # question_object = google_ai.models.generate_content(
    # model="gemini-2.0-flash", contents=prompt_question)
    # print("Google AI generated question is ", question_object.text)
    # question = question_object.text

    # prompt_answer = (f"Given the following Python problem:\n\n{question}\n\n"
    # "What is the final numeric result after executing the correct code to solve this?\n"
    # "Only return the final answer as a plain number (integer or float). No explanation, no code, no formatting — just the answer.")
    # answer_object = google_ai.models.generate_content(
    # model="gemini-2.0-flash", contents=prompt_answer)
    # print("Google AI generated answer is ", answer_object.text)
    # answer = answer_object.text

    return jsonify({'question': question})

if __name__ == '__main__':
    app.run(debug=True)