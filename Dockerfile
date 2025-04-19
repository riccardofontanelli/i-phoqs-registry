FROM python:3.10-slim

WORKDIR /app
COPY . /app

# Usa il requirements.txt per installare tutte le dipendenze
RUN pip install --no-cache-dir -r requirements.txt

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]