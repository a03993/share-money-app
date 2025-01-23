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

export default function PayerSelector({ expenseData, payer, setPayer }) {
  const handleChange = (event) => {
    setPayer(event.target.value);
  };

  return (
    <FormControl sx={formControlStyle}>
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
                sx={{ backgroundColor: item.color }}
              >
                {selected.charAt(0)}
              </Avatar>
              <ListItemText
                secondary={selected}
                sx={{ ml: 1, display: "inline-block" }}
              />
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
