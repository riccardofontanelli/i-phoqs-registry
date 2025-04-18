from fastapi import FastAPI

app = FastAPI()

@app.get("/check-token")
def check_token():
    return {"status": "OK", "role": "admin"}