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

export default function ShareBySelector({
  sharedBy,
  setSharedBy,
  error,
  setOpenCreateUserModal,
  expenseItem,
}) {
  const theme = useTheme();

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
        renderValue={(selected) => (
          <div style={avatarGroup}>
            <AvatarGroup max={8} className="neutral-lightest-border">
              {selected.map((name) => {
                const item = expenseItem.find((item) => item.name === name);
                if (!item) return null;
                return (
                  <Avatar
                    key={name}
                    alt={item.name}
                    sx={{
                      backgroundColor: item.color,
                      borderColor: theme.palette.neutral.lightest,
                    }}
                    className="small-mui-avatar"
                  >
                    {name.charAt(0)?.toUpperCase()}
                  </Avatar>
                );
              })}
            </AvatarGroup>
          </div>
        )}
        MenuProps={MenuProps}
        sx={selectStyle}
      >
        {expenseItem.map((item) => (
          <MenuItem key={item.name} value={item.name}>
            <Checkbox checked={sharedBy.includes(item.name)} />
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
