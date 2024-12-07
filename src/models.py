from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class TransactionsExpenses(db.Model):
    __tablename__ = 'transactions_expenses'

    transaction_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    user_id = db.Column(db.Integer, nullable=False)
    amount = db.Column(db.Integer, nullable=False)
    category = db.Column(db.Integer, nullable=False)  # Constraint 0, 1, 2, 3
    date = db.Column(db.Date, nullable=False)
    notes = db.Column(db.Text, nullable=True)
    created_at = db.Column(db.DateTime, default=db.func.current_timestamp())
    updated_at = db.Column(db.DateTime, default=db.func.current_timestamp(), onupdate=db.func.current_timestamp())

    def __repr__(self):
        return f'<TransactionsExpenses(transaction_id={self.transaction_id}, user_id={self.user_id})>'

