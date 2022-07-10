import { TabPanel } from "@mui/lab";
import { Box, Grid } from "@mui/material";
import React from "react";
import SearchInput from "../../../components/input/SearchInput";
import GroupHeader from "./groupHeader/GroupHeader";
import GroupTable from "./groupTable/GroupTable";

const GroupTab = (props) => {
  return (
    <>
      <TabPanel value={props.value}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={3}>
            <SearchInput />
          </Grid>
          <Grid item xs={12} md={9}>
            <Box style={{ height: 371, width: "100%" }}>
              <GroupHeader />
              <GroupTable />
            </Box>
          </Grid>
        </Grid>
      </TabPanel>
    </>
  );
};

export default GroupTab;
