import requests

def get_exchange_rate(currency_code):
    """
    Возвращает курс валюты к гривне (например, USD -> UAH)
    """
    url = "https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json"
    response = requests.get(url)
    data = response.json()

    for item in data:
        if item["cc"] == currency_code.upper():
            return item["rate"]
    return None
