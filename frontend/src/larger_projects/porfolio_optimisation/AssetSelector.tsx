import { CircularProgress, Autocomplete, TextField } from "@mui/material";
import { useState, Dispatch, SetStateAction } from "react";
import { api } from "../../api/Api";


const AssetSelector = ({assets, setAssets} : { assets: string[] | undefined, setAssets: Dispatch<SetStateAction<string[] | undefined>> }) => {
  const [tickers, setTickers] = useState<string[]>(["AAPL", "MSFT", "TSLA"]);
  const [searchValue, setSearchValue] = useState<string>();
  const [prevYearsCount, setPrevYearsCount] = useState<number>();

  const [loading, setLoading] = useState<boolean>();

  const getTickers = () => {
    api.get("/getTickers/")
  }

  return (
    <div>
      <Autocomplete
        options={tickers}
        renderInput={(params) => (
        <TextField
          {...params}
          label="Search tickers..."
          placeholder="Type to search tickers"
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <>
                {loading ? <CircularProgress size={20} /> : null}
                {params.InputProps.endAdornment}
              </>
            ),
          }}
        />
      )}
      />
    </div>
  )
}

export default AssetSelector;