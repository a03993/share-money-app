import {
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  IconButton,
  Typography,
  Collapse,
  Box,
  Alert,
} from "@mui/material";
import {
  Delete as DeleteIcon,
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon,
} from "@mui/icons-material";

import { useState } from "react";
import { palette } from "../styles/palette";

export default function ExpenseList({ expenseData, setExpenseData }) {
  const [expanded, setExpanded] = useState({});

  const handleExpandClick = (index) => {
    setExpanded((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const handleDelete = (expenseToDelete) => {
    setExpenseData((prevData) =>
      prevData.map((person) => ({
        ...person,
        expenses: person.expenses.filter(
          (expense) =>
            expense.item !== expenseToDelete.item ||
            expense.amount !== expenseToDelete.amount
        ),
      }))
    );
  };

  const flattenedExpenses = expenseData.flatMap((person) =>
    person.expenses.map((expense) => ({
      ...expense,
      name: person.name,
      color: person.color,
      sharedBy: expense.sharedBy || [],
    }))
  );

  return (
    <>
      <Typography variant="h6" sx={{ mb: 3 }}>
        Expense List
      </Typography>
      {flattenedExpenses.length === 0 && (
        <Alert severity="" sx={{ bgcolor: palette.background.paper }}>
          NOTHING INSIDE!
          <br />
          Please add an expense using the form above.
        </Alert>
      )}
      <List>
        {flattenedExpenses.map((expense, index) => (
          <div key={index}>
            <ListItem
              divider
              secondaryAction={
                <Box sx={{ display: "flex", gap: 1 }}>
                  <IconButton
                    edge="end"
                    aria-label="expand"
                    onClick={() => handleExpandClick(index)}
                    className="expense-list-button"
                  >
                    {expanded[index] ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                  </IconButton>
                  <IconButton
                    edge="end"
                    aria-label="delete"
                    className="expense-list-button"
                    onClick={() => handleDelete(expense)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Box>
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
                primary={`$${expense.amount.toLocaleString()}`}
                sx={{ textAlign: "right", marginRight: 5 }}
              />
            </ListItem>
            <Collapse in={expanded[index]} timeout="auto" unmountOnExit>
              <List
                component="div"
                disablePadding
                sx={{ backgroundColor: palette.background.paper }}
              >
                {expense.sharedBy && (
                  <ListItem sx={{ pl: 4 }}>
                    <ListItemText
                      primary="Share by:"
                      secondary={
                        <Box sx={{ display: "flex", flexWrap: "wrap" }}>
                          <Typography variant="body2">
                            {expense.sharedBy.join(", ")}
                          </Typography>
                        </Box>
                      }
                    />
                  </ListItem>
                )}
              </List>
            </Collapse>
          </div>
        ))}
      </List>
    </>
  );
}
