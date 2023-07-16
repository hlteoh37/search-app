import * as React from 'react';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Autocomplete from '@mui/material/Autocomplete';

export default function AutocompleteSearch({searchables, fieldSelector, onChangeCallback, defaultText="Start searching..."}) {
  return (
    <Stack spacing={2}>
      <Autocomplete
        id="searchable"
        disableClearable
        options={searchables.map(fieldSelector)}
        renderInput={(params) => <TextField {...params} label={defaultText} />}
        onChange={(event, value) => {
          onChangeCallback(value);
        }}
      />
    </Stack>
  );
}

