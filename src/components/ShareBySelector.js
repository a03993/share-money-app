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
} from "../styles/selectorStyle";

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
            <AvatarGroup max={8} className="avatar-group-select">
              {selected.map((name) => {
                const item = expenseData.find((item) => item.name === name);
                return (
                  <Avatar key={name} sx={{ backgroundColor: item.color }}>
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
            <Avatar
              className="small-mui-avatar"
              sx={{ backgroundColor: item.color }}
            >
              {item.name.charAt(0)}
            </Avatar>
            <ListItemText secondary={item.name} sx={{ ml: 1 }} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
