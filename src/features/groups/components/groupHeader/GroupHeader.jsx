import CreateIcon from "@mui/icons-material/Create";
import GroupsIcon from "@mui/icons-material/Groups";
import { Box, Button, ButtonGroup, Typography } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Forms from "../../../../components/form/Forms";
import { countStudyGroup } from "../../groupSlice";
import GroupProcessCreateForm from "../groupForm/GroupProcessCreateForm";

const GroupHeader = () => {
  const [openForms, setOpenForms] = React.useState(false);
  const dispatch = useDispatch();
  const { count_study_groups } = useSelector((state) => state.group);
  React.useEffect(() => {
    dispatch(countStudyGroup());
  }, [dispatch]);
  const handleClickOpenForms = () => {
    setOpenForms(true);
  };
  const handleClickCloseForms = () => {
    setOpenForms(false);
  };
  return (
    <>
      <Box sx={{ display: "flex", alignItems: "center", marginBottom: "30px" }}>
        <GroupsIcon sx={{ fontSize: "40px" }} />
        <Typography variant="h6" sx={{ marginLeft: "5px" }}>
          {count_study_groups} groups
        </Typography>
        <ButtonGroup
          variant="contained"
          sx={{
            marginLeft: "8px",
            backgroundColor: "#34CAE0",
            ":hover": {
              backgroundColor: "#34CAE0",
            },
          }}
        >
          <Button
            onClick={handleClickOpenForms}
            className="button-create-icon"
            sx={{
              backgroundColor: "#09bdd8",
              ":hover": {
                backgroundColor: "#09bdd8",
              },
            }}
          >
            <CreateIcon />
          </Button>
          <Button
            onClick={handleClickOpenForms}
            sx={{
              backgroundColor: "#34CAE0",
              ":hover": {
                backgroundColor: "#34CAE0",
                opacity: 1,
              },
            }}
          >
            New
          </Button>
        </ButtonGroup>
      </Box>
      <Forms
        openForms={openForms}
        handleCloseForms={handleClickCloseForms}
        componentForms={
          <GroupProcessCreateForm closeDialog={handleClickCloseForms} />
        }
      />
    </>
  );
};

export default GroupHeader;
