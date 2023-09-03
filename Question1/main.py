import requests
import json
from flask import Flask, jsonify


def get_numbers(urls):
    numbers = []
    for url in urls:
        response = requests.get(url, timeout=500)
        if response.status_code == 200:
            data = json.loads(response.content)
            numbers.extend(data["numbers"])
    numbers = list(set(numbers))
    numbers.sort()
    return numbers


def main():
    app = Flask(__name__)

    @app.route("/numbers")
    def get_numbers_endpoint():
        urls = ["http://20.244.56.144/numbers/primes",
                "http://20.244.56.144/numbers/fibo",
                "http://20.244.56.144/numbers/odd",
                "http://20.244.56.144/numbers/rand"]
        numbers = get_numbers(urls)
        return jsonify({"numbers": numbers})

    app.run(host="localhost", port=8008)


if __name__ == "__main__":
    main()
