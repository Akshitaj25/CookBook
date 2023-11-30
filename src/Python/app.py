import re
import os
from flask import Flask, jsonify, request
import openai
import requests
import json
import pymongo
from flask_cors import CORS
import spacy
from bson import json_util

app = Flask(__name__)
CORS(app)

openai.api_key = "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"
model = "gpt-3.5-turbo"


@app.route('/process-recipe', methods=['GET'])
def generate_itinerary():
        searchTerm = request.args.get("searchTerm")
        ingredients = request.args.getlist("ingredients[]")
        steps = request.args.getlist("steps[]")
        recipeName=request.args.get("recipeName")
        prompt = f"Modify the recipe {recipeName} based on the following instructions: {searchTerm}." \
             f"Ingredients: {', '.join(ingredients)}." \
             f"Steps: {' '.join(steps)}."
        prompt += "Detailed and strictly follow the format specified.\n"
        prompt += "give in bullet points"
        prompt += "don't add extra notes before or after"
        # print(prompt)
        print(" ")
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo-0613",
            messages=[
                {"role": "system", "content": "You are a helpful recipe generator."},
                {"role": "user", "content": prompt}
            ],
            max_tokens=3000,
            timeout=2
        )
        output_text = response.choices[0].message['content'].strip()
        print(output_text)
           # Process the generated output to extract modified ingredients and steps
        processed_output = process_text_output(output_text)

    # Return processed data as JSON response
        response = {
            "ingredients": processed_output["ingredients"],
            "steps": processed_output["steps"]
         }

        return jsonify(response)

def process_text_output(output):
    ingredients = []
    steps = []
    is_ingredient_mode = False
    in_note = False

    lines = output.split("\n")

    for line in lines:
        if line == "Ingredients:":
            is_ingredient_mode = True
            continue

        if is_ingredient_mode and line == "Steps:":
            is_ingredient_mode = False
            continue

        if line == "Note:" or line == "Tip:" or line == "Variation:" or line == "Additional Notes:":
            in_note = True
            continue

        if line == "":
            in_note = False

        if is_ingredient_mode and line:
            ingredients.append(line.strip().lstrip('*').rstrip('*'))

        elif not in_note and line:
            steps.append(line)

    return {"ingredients": ingredients, "steps": steps}


if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5001))
    app.run(debug=True, host='0.0.0.0', port=port)
