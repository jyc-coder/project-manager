import {IconButton, TextField} from '@mui/material';
import React, {useCallback, useEffect, useState} from 'react';
import SearchIcon from '@mui/icons-material/Search';
import {useSearchParams} from 'react-router-dom';
function SearchInput() {
  const [text, setText] = useState('');
  const [searchParams, setSearchParms] = useSearchParams();

  const onSubmit = useCallback(() => {
    if (text === '') return;
    setSearchParms({q: text});
  }, [setSearchParms, text]);

  const onChange = useCallback((e) => {
    setText(e.target.value);
  }, []);

  const onKeyup = useCallback(
    (e) => {
      if (e.key !== 'Enter') return;
      onSubmit();
    },
    [onSubmit],
  );

  useEffect(() => {
    const query = searchParams.get('q');
    if (!query) return;
    setText(query);
  }, [searchParams]);
  return (
    <TextField
      label="Github User 입력"
      variant="outlined"
      sx={{margin: '50px auto', width: '80%'}}
      value={text}
      onChange={onChange}
      onKeyUp={onKeyup}
      InputProps={{
        endAdornment: (
          <IconButton type="button" onClick={onSubmit}>
            <SearchIcon />
          </IconButton>
        ),
      }}
    ></TextField>
  );
}

export default SearchInput;
