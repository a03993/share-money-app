import {
  Avatar,
  AvatarGroup,
  OutlinedInput,
  InputLabel,
  MenuItem,
  FormControl,
  ListItemText,
  Select,
  Checkbox,
} from "@mui/material";

import {
  formControlStyle,
  avatarGroup,
  selectStyle,
} from "../styles/selectorStyle";

import { memo } from "react";
import { useTheme } from "@mui/material/styles";

import CreateUserMenuItem from "./CreateUserMenuItem";

const UserAvatar = memo(({ name, color, theme }) => (
  <Avatar
    key={name}
    alt={name}
    sx={{
      backgroundColor: color,
      borderColor: theme.palette.grayscale.light,
    }}
    className="small-mui-avatar"
  >
    {name.charAt(0)?.toUpperCase()}
  </Avatar>
));

export default function ExpenseShareSelector({
  sharedBy,
  setSharedBy,
  error,
  setOpenCreateUserModal,
  expenseItem,
}) {
  const theme = useTheme();

  const renderValue = (selected) => (
    <div style={avatarGroup}>
      <AvatarGroup
        max={8}
        className="white-border"
        slotProps={{
          additionalAvatar: {
            sx: {
              width: 30,
              height: 30,
              fontSize: 16,
              backgroundColor: theme.palette.grayscale.light,
              color: theme.palette.secondary.dark,
            },
          },
        }}
      >
        {selected.map((name) => {
          const item = expenseItem.find((item) => item.name === name);
          if (!item) return null;
          return (
            <UserAvatar name={item.name} color={item.color} theme={theme} />
          );
        })}
      </AvatarGroup>
    </div>
  );

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setSharedBy(typeof value === "string" ? value.split(",") : value);
  };

  return (
    <FormControl sx={formControlStyle} required error={error}>
      <InputLabel id="user-select-checkbox-label">Share by</InputLabel>
      <Select
        labelId="user-select-checkbox-label"
        id="user-select-checkbox"
        multiple
        value={sharedBy}
        onChange={handleChange}
        input={<OutlinedInput label="Share by" />}
        renderValue={renderValue}
        sx={selectStyle}
      >
        {expenseItem.map((item) => (
          <MenuItem key={item.name} value={item.name}>
            <Checkbox checked={sharedBy.includes(item.name)} />
            <UserAvatar name={item.name} color={item.color} theme={theme} />
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
