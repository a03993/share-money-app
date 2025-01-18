import { Typography } from "@mui/material";

const commonStyles = {
  fontFamily: "Outfit",
};

export const styles = {
  title: {
    ...commonStyles,
    marginBottom: "3rem",
  },
  amount: {
    ...commonStyles,
    fontWeight: 400,
    textAlign: "center",
  },
  personCount: {
    ...commonStyles,
    fontWeight: 900,
  },
};

export default function SummarySection({ expenseData, totalAmount }) {
  return (
    <>
      <Typography sx={styles.title} variant="h6">
        Summary
      </Typography>
      <Typography variant="h3" gutterBottom sx={styles.amount}>
        {expenseData.length}
        <Typography variant="h5" component="span" sx={styles.personCount}>
          人
        </Typography>{" "}
        ${totalAmount.toLocaleString()}
      </Typography>
    </>
  );
}
