"""merge heads

Revision ID: c1f5fec83a7f
Revises: 97fe85696bc4, aa60edda5458
Create Date: 2025-04-28 19:45:45.422627

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = 'c1f5fec83a7f'
down_revision: Union[str, None] = ('97fe85696bc4', 'aa60edda5458')
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    pass


def downgrade() -> None:
    pass
