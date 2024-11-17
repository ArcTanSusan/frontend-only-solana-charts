import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useState } from 'react';

interface BasicSelectProp {
  items: {
    value: string;
    label: string;
  }[];
  handleChange: (event: SelectChangeEvent) => void;
}
export default function BasicSelect(props: BasicSelectProp) {
  const { items, handleChange } = props;
  const [value, setValue] = useState('');
  const handleChangeEvent = (event: SelectChangeEvent) => {
    setValue(event.target.value);
    handleChange(event);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">
          Remove Country Currency
        </InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={value}
          label="Country Currency"
          onChange={handleChangeEvent}
        >
          {items.map(item => (
            <MenuItem key={item.value} value={item.value}>
              {item.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}
