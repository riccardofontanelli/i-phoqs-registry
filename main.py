# registry-api/main.py

from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
import requests

app = FastAPI()

# Permette al frontend React (localhost:3000) di accedere
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
    "http://localhost:3000",  # per sviluppo locale
    "https://registry-frontend.onrender.com"  # per deploy su Render
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Gateway verso data-store
DATA_STORE_URL = "https://i-phoqs-data-store.onrender.com"

@app.get("/strumenti")
def get_strumenti():
    try:
        response = requests.get(f"{DATA_STORE_URL}/strumenti")
        return response.json()
    except Exception as e:
        return {"error": str(e)}

@app.post("/strumenti")
def add_strumento(payload: dict):
    try:
        response = requests.post(f"{DATA_STORE_URL}/strumenti", json=payload)
        return response.json()
    except Exception as e:
        return {"error": str(e)}

@app.delete("/strumenti/{id}")
def delete_strumento(id: int):
    try:
        response = requests.delete(f"{DATA_STORE_URL}/strumenti/{id}")
        return response.json()
    except Exception as e:
        return {"error": str(e)}