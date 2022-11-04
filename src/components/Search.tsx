import {
  IconButton,
  InputAdornment,
  TextField,
  TextFieldProps,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";

type SearchProps = {
  onClear: () => void;
} & TextFieldProps;

const Search = ({ onClear, ...props }: SearchProps) => {
  const clearVisible = Boolean(props.value);
  return (
    <TextField
      {...props}
      InputProps={{
        ...props.InputProps,
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        ),
        endAdornment: (
          <InputAdornment position="end">
            {clearVisible && (
              <IconButton size="small" onClick={onClear}>
                <ClearIcon />
              </IconButton>
            )}
          </InputAdornment>
        ),
      }}
    ></TextField>
  );
};

export default Search;
