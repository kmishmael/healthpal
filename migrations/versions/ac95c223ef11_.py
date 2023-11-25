"""empty message

Revision ID: ac95c223ef11
Revises: 
Create Date: 2023-11-25 19:22:54.394934

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'ac95c223ef11'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('user',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(), nullable=True),
    sa.Column('email', sa.String(length=120), nullable=True),
    sa.Column('profile_photo', sa.String(), nullable=True),
    sa.Column('email_verified', sa.Enum('true', 'false', name='isverified'), nullable=True),
    sa.Column('password_hash', sa.String(length=100), nullable=False),
    sa.Column('role', sa.Enum('user', 'admin', name='userroles'), nullable=True),
    sa.Column('age', sa.Integer(), nullable=True),
    sa.Column('height', sa.Integer(), nullable=True),
    sa.Column('weight', sa.Integer(), nullable=True),
    sa.Column('gender', sa.Enum('male', 'female', 'other', name='genderoptions'), nullable=True),
    sa.Column('target_calories', sa.Integer(), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    with op.batch_alter_table('user', schema=None) as batch_op:
        batch_op.create_index(batch_op.f('ix_user_email'), ['email'], unique=True)

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('user', schema=None) as batch_op:
        batch_op.drop_index(batch_op.f('ix_user_email'))

    op.drop_table('user')
    # ### end Alembic commands ###
