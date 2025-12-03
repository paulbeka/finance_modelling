import { CircularProgress, Autocomplete, TextField, Chip, Box } from "@mui/material";
import { useState, Dispatch, SetStateAction, useCallback } from "react";
import { api } from "../../api/Api";

type YahooTicker = {
  symbol: string;
  shortname?: string;
  exchDisp?: string;
};

const AssetSelector = ({
  assets,
  setAssets,
}: {
  assets: string[] | undefined;
  setAssets: Dispatch<SetStateAction<string[] | undefined>>;
}) => {
  const [tickers, setTickers] = useState<YahooTicker[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState("");

  let timer: NodeJS.Timeout | null = null;

  const fetchTickers = useCallback((searchValue: string) => {
    if (timer) clearTimeout(timer);

    if (!searchValue) {
      setTickers([]);
      return;
    }

    timer = setTimeout(async () => {
      setLoading(true);

      const res = await api.get("/data_util/tickers", {
        params: { query: searchValue },
      });

      setTickers(res.data || []);
      setLoading(false);
    }, 800);
  }, []);

  return (
    <div>
      <Autocomplete
        inputValue={inputValue}
        options={tickers}
        getOptionLabel={(option: YahooTicker) =>
          `${option.symbol} — ${option.shortname ?? "No name"} (${option.exchDisp ?? ""})`
        }
        onChange={(_, value) => {
          if (value) {
            setAssets((prev) =>
              prev ? [...prev, value.symbol] : [value.symbol]
            );
          }
          setInputValue("");
          setTickers([]);
        }}
        onInputChange={(_, value) => {
          setInputValue(value);
          fetchTickers(value);
        }}
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

      <Box mt={2} sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
        {assets?.map((symbol) => (
          <Chip key={symbol} label={symbol} />
        ))}
      </Box>
    </div>
  );
};

export default AssetSelector;
