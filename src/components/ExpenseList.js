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
import theme from "../styles/theme";

export default function ExpenseList({ expenseData }) {
  return (
    <>
      <Typography className="expense-list-title" variant="h6">
        Expense List
      </Typography>
      <List>
        {expenseData.map((expense, index) => (
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
                sx={{
                  backgroundColor: expense.color,
                }}
                alt={expense.name}
              >
                {expense.name[0]}
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={expense.item} secondary={expense.name} />
            <ListItemText
              className="expense-amount"
              primary={`$${expense.amount.toLocaleString()}`}
            />
          </ListItem>
        ))}
      </List>
    </>
  );
}
