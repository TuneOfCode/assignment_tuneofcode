import { Avatar } from "@mui/material";
import StorageKey from "./storage.key";

const DOMAIN = "localhost";
const PORT = "2208";
const VERSION = "v1";
export const ROOT_API_URL = `http://${DOMAIN}:${PORT}/api/${VERSION}/`;
export const PARAMS = {
  LIMIT: 2,
  PAGE: 1,
};
export const SIZE = {
  ROWS: 5,
};
export const TABLE = {
  ROW_STUDENT: JSON.parse(localStorage.getItem(StorageKey.STUDENTS)).length,
  COL_STUDENT: [
    { field: "id", headerName: "", hide: true },
    {
      field: "avatar",
      headerName: "",
      width: 70,
      renderCell: ({ value }) => <Avatar src={value} />,
    },
    {
      field: "name",
      headerName: "Name",
      width: 200,
      type: "string",
      sortable: false,
    },
    { field: "sex", headerName: "Sex", width: 130, type: "string" },
    {
      field: "placeAndDatebirth",
      headerName: "Place And Date Birth",
      width: 250,
    },
    {
      field: "groups",
      headerName: "Groups",
      width: 250,
      type: "string",
    },
    {
      field: "actions",
      headerName: "",
      type: "actions",
      width: 150,
    },
  ],
  ROW_GROUP: JSON.parse(localStorage.getItem(StorageKey.GROUPS)).length,
  COL_GROUP: [
    { field: "id", headerName: "", hide: true },
    {
      field: "name",
      headerName: "Name",
      width: 200,
      type: "string",
      sortable: false,
    },
    {
      field: "subject",
      headerName: "Subject",
      width: 450,
    },
    {
      field: "leader",
      headerName: "Leader",
      width: 200,
      type: "string",
    },
    {
      field: "actions",
      headerName: "",
      type: "actions",
      width: 200,
    },
  ],
};
export const common_css = {
  bg_main: "#e8ecef",
  text_color_title: "#9da8af",
  text_color_error: "#d32f2f",
};
