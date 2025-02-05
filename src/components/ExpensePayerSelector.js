import {
  Avatar,
  OutlinedInput,
  InputLabel,
  MenuItem,
  FormControl,
  ListItemText,
  Select,
} from "@mui/material";

import { memo, useCallback } from "react";

import {
  formControlStyle,
  avatarGroup,
  selectStyle,
} from "../styles/selectorStyle";

import { useTheme } from "@mui/material/styles";

import CreateUserMenuItem from "./CreateUserMenuItem";

const UserAvatar = memo(({ name, color }) => (
  <Avatar
    className="small-mui-avatar"
    alt={name}
    sx={{ backgroundColor: color }}
  >
    {name.charAt(0)?.toUpperCase()}
  </Avatar>
));

export default function ExpensePayerSelector({
  payer,
  setPayer,
  error,
  setOpenCreateUserModal,
  expenseItem,
}) {
  const theme = useTheme();

  const renderSelectedValue = useCallback(
    (selected) => {
      const item = expenseItem.find((item) => item.name === selected);
      return (
        <div style={avatarGroup}>
          <UserAvatar name={item.name} color={item.color} />
          <ListItemText secondary={selected} sx={{ ml: 1 }} />
        </div>
      );
    },
    [expenseItem]
  );

  const handleChange = useCallback(
    (event) => {
      setPayer(event.target.value);
    },
    [setPayer]
  );

  return (
    <FormControl sx={formControlStyle} required error={error}>
      <InputLabel id="user-select-label">Payer</InputLabel>
      <Select
        labelId="user-select-label"
        id="user-select"
        value={payer}
        onChange={handleChange}
        input={<OutlinedInput label="Payer" />}
        renderValue={renderSelectedValue}
        sx={selectStyle}
      >
        {expenseItem.map((item) => (
          <MenuItem key={item.name} value={item.name}>
            <UserAvatar name={item.name} color={item.color} />
            <ListItemText secondary={item.name} sx={{ ml: 1 }} />
          </MenuItem>
        ))}
        <CreateUserMenuItem
          setOpenCreateUserModal={setOpenCreateUserModal}
          theme={theme}
        />
      </Select>
    </FormControl>
  );
}
