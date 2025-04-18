from pydantic import BaseModel

class Strumento(BaseModel):
    nome: str
    laboratorio: str