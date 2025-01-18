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

const commonStyles = {
  fontFamily: "Outfit",
};

export const styles = {
  title: {
    ...commonStyles,
    marginBottom: "1rem",
  },
  primary: {
    ...commonStyles,
    fontWeight: 500,
    color: "#0E0E0E",
  },
  secondary: {
    ...commonStyles,
    fontWeight: 300,
    color: "#606060",
  },
};

export default function ExpenseList({ expenseData }) {
  return (
    <>
      <Typography sx={styles.title} variant="h6">
        Expense List
      </Typography>
      <List sx={{ maxWidth: "30rem", margin: "auto" }}>
        {expenseData.map((expense, index) => (
          <ListItem
            key={index}
            divider
            secondaryAction={
              <IconButton edge="end" aria-label="delete">
                <DeleteIcon sx={{ color: "#E5E5E5" }} />
              </IconButton>
            }
          >
            <ListItemAvatar>
              <Avatar
                sx={{
                  backgroundColor: expense.color,
                  ...styles.common,
                  fontWeight: 600,
                }}
                alt={expense.name}
              >
                {expense.name[0]}
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={expense.item}
              secondary={expense.name}
              primaryTypographyProps={{
                ...styles.primary,
                fontSize: "1rem",
              }}
              secondaryTypographyProps={styles.secondary}
            />
            <ListItemText
              primary={`$${expense.amount.toLocaleString()}`}
              primaryTypographyProps={styles.primary}
              sx={{
                textAlign: "right",
                marginRight: 2,
                flex: "0 0 auto",
              }}
            />
          </ListItem>
        ))}
      </List>
    </>
  );
}
