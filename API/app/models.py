from sqlalchemy import Column, Integer, String, Boolean
from sqlalchemy.orm import declarative_base

Base = declarative_base()

class Kot(Base):
    __tablename__ = "Koty"
    __table_args__ = {"schema": "dbo"}
    
    id = Column(Integer, primary_key=True, autoincrement=True)
    Imie = Column(String(100)) 
    Rasa = Column(String(100))
    Wiek = Column(Integer)
    DoAdopcji = Column(Boolean)
