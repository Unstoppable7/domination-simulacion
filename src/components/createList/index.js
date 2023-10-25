import * as React from "react";
import ListSubheader from "@mui/material/ListSubheader";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { townlevelOneList } from "../../utils/build-list";
import { ListItemIcon } from "@mui/material";

export default function CreateList({ list = [], handleCreateItem }) {
  const [open, setOpen] = React.useState(true);

  return (
    <List
      sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={
        <ListSubheader component="div" id="nested-list-subheader">
          Selecciona una base
        </ListSubheader>
      }
    >
      {list.map((item, key) => (
        <ListItemButton key={key} onClick={() => handleCreateItem(item)}>
          <ListItemIcon>
            <img
              src={item.image}
              alt="town"
              width={20}
              height={20}
              style={{
                borderRadius: 50,
                marginRight: 8,
              }}
            />
          </ListItemIcon>
          <ListItemText primary={item.name} />
          <div>
            <ListItemText primary={`(${item.quantity})`} />
          </div>
        </ListItemButton>
      ))}
    </List>
  );
}
