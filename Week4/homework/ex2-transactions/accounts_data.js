//Week4/homework/ex2-transactions/accounts_data.js
export const accounts = [
    {
        "account_number": 101,
        "balance": 1000.00,
        "account_changes": [
            {
                "change_number": 1,
                "amount": -100.00,
                "changed_date": "2024-08-01T10:00:00Z",
                "remark": "ATM Withdrawal"
            },
            {
                "change_number": 2,
                "amount": 300.00,
                "changed_date": "2024-08-02T14:00:00Z",
                "remark": "Salary Deposit"
            }
    ]
    },
    {
        "account_number": 102,
        "balance": 1500.50,
        "account_changes": [
            {"change_number": 3, "amount": 200.00, "changed_date": '2024-08-01T12:00:00Z', "remark": 'Direct Deposit' }
        ]
    },
    {
        "account_number": 103,
        "balance": 500.75,
        "account_changes": [
            {"change_number": 4, "amount": -50.25, "changed_date": '2024-08-02T09:30:00Z', "remark": 'Online Purchase' }
        ]
    }
]