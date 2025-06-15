from typing import List, Optional
from fastapi import FastAPI, Depends
from sqlmodel import Field, Session, SQLModel, create_engine, select

# 1. Definer databasemodellen med SQLModel
class Category(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    name: str = Field(index=True)
    description: Optional[str] = None

# Database-URL (for nå bruker vi en lokal SQLite-database for enkelhetens skyld)
# Senere kan du bytte denne ut med din PostgreSQL-URL fra Heroku/Render
DATABASE_URL = "sqlite:///database.db"

engine = create_engine(DATABASE_URL, echo=True)

# Funksjon for å opprette databasetabeller
def create_db_and_tables():
    SQLModel.metadata.create_all(engine)

# Funksjon for å hente en database-session (avhengighet)
def get_session():
    with Session(engine) as session:
        yield session

app = FastAPI()

# 2. Kjør create_db_and_tables når applikasjonen starter
@app.on_event("startup")
def on_startup():
    create_db_and_tables()

# 3. Definer API-endepunkter
@app.post("/categories/", response_model=Category)
def create_category(category: Category, session: Session = Depends(get_session)):
    session.add(category)
    session.commit()
    session.refresh(category)
    return category

@app.get("/categories/", response_model=List[Category])
def read_categories(session: Session = Depends(get_session)):
    categories = session.exec(select(Category)).all()
    return categories