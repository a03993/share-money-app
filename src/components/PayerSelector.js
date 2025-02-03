import {
  Avatar,
  OutlinedInput,
  InputLabel,
  MenuItem,
  FormControl,
  ListItemText,
  Select,
} from "@mui/material";

import {
  formControlStyle,
  avatarGroup,
  selectStyle,
} from "../styles/selectorStyle";

import { useTheme } from "@mui/material/styles";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export default function PayerSelector({
  expenseData,
  payer,
  setPayer,
  error,
  setOpenCreateUserModal,
}) {
  const theme = useTheme();

  const handleChange = (event) => {
    setPayer(event.target.value);
  };

  return (
    <FormControl sx={formControlStyle} required error={error}>
      <InputLabel id="user-select-label">Payer</InputLabel>
      <Select
        labelId="user-select-label"
        id="user-select"
        value={payer}
        onChange={handleChange}
        input={<OutlinedInput label="Payer" />}
        renderValue={(selected) => {
          const item = expenseData.find((item) => item.name === selected);
          return (
            <div style={avatarGroup}>
              <Avatar
                className="small-mui-avatar"
                alt={item.name}
                sx={{ backgroundColor: item.color }}
              >
                {selected.charAt(0)?.toUpperCase()}
              </Avatar>
              <ListItemText secondary={selected} sx={{ ml: 1 }} />
            </div>
          );
        }}
        MenuProps={MenuProps}
        sx={selectStyle}
      >
        {expenseData.map((item) => (
          <MenuItem key={item.name} value={item.name}>
            <Avatar
              className="small-mui-avatar"
              alt={item.name}
              sx={{ backgroundColor: item.color }}
            >
              {item.name.charAt(0)?.toUpperCase()}
            </Avatar>
            <ListItemText secondary={item.name} sx={{ ml: 1 }} />
          </MenuItem>
        ))}
        <MenuItem
          onClick={(e) => {
            e.preventDefault();
            setOpenCreateUserModal(true);
          }}
          sx={{
            borderTop: 1,
            borderColor: "divider",
            justifyContent: "center",
            color: theme.palette.primary.main,
          }}
        >
          + Create New User
        </MenuItem>
      </Select>
    </FormControl>
  );
}
