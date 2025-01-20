import { useState } from "react";
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
  avatarStyle,
  listItemtextStyle,
} from "../styles/shareBySelectorStyle";

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

export default function ShareBySelector({ expenseData }) {
  const [personName, setPersonName] = useState([]);
  const [avatarMax, setAvatarMax] = useState(3);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(typeof value === "string" ? value.split(",") : value);
  };

  return (
    <FormControl sx={formControlStyle}>
      <InputLabel id="user-select-checkbox-label">Share by</InputLabel>
      <Select
        labelId="user-select-checkbox-label"
        id="user-select-checkbox"
        multiple
        value={personName}
        onChange={handleChange}
        input={<OutlinedInput label="Share by" />}
        renderValue={(selected) => (
          <div style={avatarGroup}>
            <AvatarGroup
              max={3}
              sx={{ "& .MuiAvatar-root": avatarStyle("#defaultColor") }}
            >
              {selected.map((name) => {
                const item = expenseData.find((item) => item.name === name);
                return (
                  <Avatar key={name} sx={avatarStyle(item.color)}>
                    {name.charAt(0)}
                  </Avatar>
                );
              })}
            </AvatarGroup>
          </div>
        )}
        MenuProps={MenuProps}
        sx={selectStyle}
      >
        {expenseData.map((item) => (
          <MenuItem key={item.name} value={item.name}>
            <Checkbox checked={personName.includes(item.name)} />
            <Avatar sx={avatarStyle(item.color)}>{item.name.charAt(0)}</Avatar>
            <ListItemText primary={item.name} sx={listItemtextStyle} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
