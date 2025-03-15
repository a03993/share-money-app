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
  Snackbar,
} from "@mui/material";
import {
  Delete as DeleteIcon,
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon,
} from "@mui/icons-material";

import { useState, useMemo } from "react";
import { useTheme } from "@mui/material/styles";
import { expenseService } from "../services/expenseService";

export default function ExpenseList({
  expenseList,
  setExpenseList,
  linkId,
  setTotalAmount,
}) {
  const [expanded, setExpanded] = useState({});
  const [notification, setNotification] = useState({
    open: false,
    message: "",
    severity: "",
  });

  const theme = useTheme();

  const handleExpandClick = (index) => {
    setExpanded((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const handleDelete = async (expenseToDelete) => {
    try {
      const { updatedExpense, totalAmount } =
        await expenseService.deleteExpense(linkId, expenseToDelete._id);

      setExpenseList((prevData) =>
        prevData.map((group) => {
          if (group.linkId !== linkId) return group;
          return {
            ...group,
            expenses: updatedExpense.expenses,
          };
        })
      );

      setTotalAmount(totalAmount);

      setNotification({
        open: true,
        message: "Expense deleted successfully!",
        severity: "success",
      });
    } catch (error) {
      console.error("Failed to delete expense:", error);
      setNotification({
        open: true,
        message: "Failed to delete expense. Please try again.",
        severity: "error",
      });
    }
  };

  const flattenedExpenses = useMemo(() => {
    const currentExpenseItem = expenseList.find(
      (data) => data.linkId === linkId
    );
    return (
      currentExpenseItem?.expenses.flatMap((person) =>
        person.personalExpenses.map((expense) => ({
          ...expense,
          name: person.name,
          color: person.color,
          sharedBy: expense.sharedBy || [],
        }))
      ) || []
    );
  }, [expenseList, linkId]);

  return (
    <>
      <Snackbar
        open={notification.open}
        autoHideDuration={3000}
        onClose={() => setNotification((prev) => ({ ...prev, open: false }))}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={() => setNotification((prev) => ({ ...prev, open: false }))}
          severity={notification.severity}
          sx={{ width: "100%" }}
        >
          {notification.message}
        </Alert>
      </Snackbar>
      <Typography variant="h6">Expense List</Typography>
      {flattenedExpenses.length === 0 && (
        <Alert
          severity="none"
          sx={{
            backgroundColor: theme.palette.grayscale.medium,
            color: theme.palette.secondary.dark,
            mt: 3,
          }}
        >
          <strong>NO EXPENSES FOUND!</strong>
          <br />
          Please add some expenses using the form above.
        </Alert>
      )}
      <List sx={{ mt: 1 }}>
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
                  alt={`${expense.name}'s avatar`}
                >
                  {expense.name[0]?.toUpperCase()}
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={expense.item} secondary={expense.name} />
              <ListItemText
                primary={`$${expense.amount.toLocaleString()}`}
                sx={{ textAlign: "right", mr: 5 }}
              />
            </ListItem>
            <Collapse in={expanded[index]} timeout="auto" unmountOnExit>
              <List
                component="div"
                disablePadding
                sx={{ backgroundColor: theme.palette.grayscale.medium }}
              >
                {expense.sharedBy && (
                  <ListItem sx={{ pl: 4 }}>
                    <ListItemText
                      primary="Share by:"
                      secondary={
                        <Box>
                          <Typography variant="body3">
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
