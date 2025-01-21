import {
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  IconButton,
  Typography,
} from "@mui/material";
import { Delete as DeleteIcon } from "@mui/icons-material";

export default function ExpenseList({ expenseData }) {
  const flattenedExpenses = expenseData.flatMap((person) =>
    person.expenses.map((expense) => ({
      ...expense,
      name: person.name,
      color: person.color,
    }))
  );

  return (
    <>
      <Typography variant="h6" sx={{ mb: 3 }}>
        Expense List
      </Typography>
      <List>
        {flattenedExpenses.map((expense, index) => (
          <ListItem
            key={index}
            divider
            secondaryAction={
              <IconButton
                edge="end"
                aria-label="delete"
                className="expense-delete-button"
              >
                <DeleteIcon />
              </IconButton>
            }
          >
            <ListItemAvatar>
              <Avatar
                sx={{ backgroundColor: expense.color }}
                alt={expense.name}
              >
                {expense.name[0]}
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={expense.item} secondary={expense.name} />
            <ListItemText
              className="mui-list-item-text-point"
              primary={`$${expense.amount.toLocaleString()}`}
            />
          </ListItem>
        ))}
      </List>
    </>
  );
}
