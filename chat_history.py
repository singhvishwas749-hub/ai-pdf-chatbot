from openai import OpenAI
from dotenv import load_dotenv

load_dotenv()


client = OpenAI()


history = []



history = []

while True:

    question = input("you:")

    history.append({
        "role": "user",
        "content": question
    })

    response = client.responses.create(
        model="gpt-5.6-luna",
        input=history
    )

    answer = response.output_text

    print("AI:", answer)

    history.append({
        "role": "assistant",
        "content": answer
    })