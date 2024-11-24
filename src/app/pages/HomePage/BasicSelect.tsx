import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent, SelectProps } from '@mui/material/Select';
import { useState } from 'react';
import { Checkbox, ListItemText, OutlinedInput } from '@mui/material';

const ITEM_HEIGHT = 100;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

interface BasicSelectProp {
  items: {
    value: string;
    label: string;
  }[];
  handleChange: (any) => void;
  inputLabel: string;
  label: string;
}
export default function BasicSelect(
  props: BasicSelectProp & SelectProps<string[]>,
) {
  const { items, handleChange, inputLabel, label } = props;
  const [value, setValue] = useState<string[]>([]);
  const handleChangeEvent = (event: SelectChangeEvent<string[]>) => {
    const {
      target: { value },
    } = event;
    setValue(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
    handleChange(value);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">{inputLabel}</InputLabel>
        <Select
          multiple
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={value}
          label={label}
          onChange={handleChangeEvent}
          input={<OutlinedInput label="Tag" />}
          renderValue={selected => selected.join(', ')}
          MenuProps={MenuProps}
        >
          {items.map(item => (
            <MenuItem key={item.value} value={item.value}>
              <Checkbox checked={value.includes(item.value)} />
              <ListItemText primary={item.value} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}
