import { Box, Typography } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { common_css } from "../../constants/common.constant";
import { getListGroupBox } from "../../features/groups/groupSlice";
import CheckboxInput from "./CheckboxInput";

const FilterInput = () => {
  const dispatch = useDispatch();
  const { groupBox } = useSelector((state) => state.group);
  useEffect(() => {
    dispatch(getListGroupBox());
  }, []);
  return (
    <Box
      sx={{
        marginTop: "50px",
      }}
    >
      <Typography
        variant="h6"
        textTransform="uppercase"
        sx={{
          color: common_css.text_color_title,
          fontWeight: 600,
          textAlign: { xs: "center", md: "left" },
        }}
      >
        FILTERS FOR STUDY GROUPS
      </Typography>
      <Box
        sx={{
          display: { xs: "flex", md: "block" },
          height: { xs: "auto", md: "200px" },
          overflowY: "auto",
          flexWrap: "wrap",
          justifyContent: { xs: "center", md: "flex-start" },
        }}
      >
        {groupBox.map((group) => (
          <Box
            key={group.id}
            sx={{
              display: "flex",
              alignItems: "center",
              width: "auto",
            }}
          >
            <CheckboxInput value={group.name} sx={{ display: "block" }} />
            <Typography sx={{ color: "#333", fontWeight: 600 }}>
              {group.name}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default FilterInput;
