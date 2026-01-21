from fastapi import FastAPI, HTTPException, Depends, Request
from fastapi.middleware.cors import CORSMiddleware
from database import SessionLocal
from models import Kot
from sqlalchemy.orm import Session
from fastapi import Body
from sqlalchemy import cast, String

app = FastAPI(title="Schronisko")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://127.0.0.1:3000"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

from typing import Optional
from fastapi import Query

@app.get("/koty")
def get_koty(
    doAdopcji: Optional[bool] = Query(None),
    db: Session = Depends(get_db)
):
    query = db.query(Kot)

    if doAdopcji is not None:
        query = query.filter(Kot.DoAdopcji == doAdopcji)

    koty = query.all()

    return [
        {
            "Id": k.id,
            "Imie": k.Imie,
            "Rasa": k.Rasa,
            "Wiek": k.Wiek,
            "DoAdopcji": k.DoAdopcji
        }
        for k in koty
    ]


@app.get("/koty/{id}")
def get_kot(id: int, db: Session = Depends(get_db)):
    kot = db.query(Kot).filter(Kot.id == id).first()

    if not kot:
        raise HTTPException(404, "Kot nie znaleziony")

    return {
        "Id": kot.id,
        "Imie": kot.Imie,
        "Rasa": kot.Rasa,
        "Wiek": kot.Wiek,
        "DoAdopcji": kot.DoAdopcji
    }


@app.post("/koty")
def create_kot(
    data: dict = Body(...),
    db: Session = Depends(get_db)
):
    kot = Kot(**data)
    db.add(kot)
    db.commit()
    db.refresh(kot)

    return {
        "Id": kot.id,
        "Imie": kot.Imie,
        "Rasa": kot.Rasa,
        "Wiek": kot.Wiek,
        "DoAdopcji": kot.DoAdopcji
    }


@app.put("/koty/{id}")
def update_kot(
    id: int,
    data: dict = Body(...),
    db: Session = Depends(get_db)
):
    kot = db.query(Kot).filter(Kot.id == id).first()

    if not kot:
        raise HTTPException(404, "Kot nie znaleziony")

    if "Wiek" in data and data["Wiek"] < 0:
        raise HTTPException(
            status_code=400,
            detail="Wiek kota nie może być mniejszy niż 0"
        )

    for key, value in data.items():
        setattr(kot, key, value)

    db.commit()

    return {"message": "Zaktualizowano kota"}



@app.delete("/koty/{id}")
def delete_kot(id: int, db: Session = Depends(get_db)):
    kot = db.query(Kot).filter(Kot.id == id).first()

    if not kot:
        raise HTTPException(404, "Kot nie znaleziony")

    if kot.DoAdopcji is False:
        raise HTTPException(
            status_code=403,
            detail="Nie można usunąć kota, który nie jest do adopcji"
        )

    db.delete(kot)
    db.commit()

    return {"message": f"Kot o id={id} usunięty"}
