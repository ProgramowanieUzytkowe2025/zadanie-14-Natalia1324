"""seed koty data

Revision ID: 47884913836c
Revises: 
Create Date: 2026-01-29 20:54:25.029139

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = "222_seed_koty"
down_revision: Union[str, Sequence[str], None] = "141cf40a5119"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""
    koty_table = sa.table(
        'Koty',
        sa.column('Imie', sa.String),
        sa.column('Rasa', sa.String),
        sa.column('Wiek', sa.Integer),
        sa.column('DoAdopcji', sa.Boolean),
        schema='dbo'
    )

    op.bulk_insert(
        koty_table,
        [
            {"Imie": "Mruczek", "Rasa": "Dachowiec", "Wiek": 2, "DoAdopcji": True},
            {"Imie": "Filemon", "Rasa": "Perski", "Wiek": 5, "DoAdopcji": False},
            {"Imie": "Luna", "Rasa": "Syjamski", "Wiek": 1, "DoAdopcji": True},
        ]
    )


def downgrade() -> None:
    """Downgrade schema."""
    op.execute("DELETE FROM dbo.Koty")
