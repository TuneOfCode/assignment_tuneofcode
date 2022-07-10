import { Box, IconButton, InputBase, Paper, Typography } from "@mui/material";
import { common_css } from "../../constants/common.constant";
import SearchIcon from "@mui/icons-material/Search";

const SearchInput = () => {
  return (
    <Box>
      <Typography
        variant="h6"
        textTransform="uppercase"
        sx={{
          color: common_css.text_color_title,
          fontWeight: 600,
          textAlign: { xs: "center", md: "left" },
        }}
      >
        Search for name
      </Typography>
      <Paper
        sx={{
          backgroundColor: common_css.bg_main,
          display: "flex",
          alignItems: "center",
          width: { xs: "100%", md: 250 },
          fontSize: "20px",
        }}
      >
        <IconButton sx={{ p: "10px" }} aria-label="menu">
          <SearchIcon />
        </IconButton>
        <InputBase sx={{ ml: 1, flex: 1 }} />
      </Paper>
    </Box>
  );
};

export default SearchInput;
