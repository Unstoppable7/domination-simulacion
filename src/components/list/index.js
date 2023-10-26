import * as React from "react";
import ListSubheader from "@mui/material/ListSubheader";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";

export default function NestedList({ showImproveOption = true, handleCollect, handleUpgrade, handleDisableCollectBotton,handleDisableUpgradeBotton }) {
  return (
    <List
      sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={
        <ListSubheader component="div" id="nested-list-subheader">
          Selecciona una opción
        </ListSubheader>
      }
    >
      {showImproveOption && (
        <ListItemButton onClick={handleUpgrade} disabled={handleDisableUpgradeBotton}>
          <ListItemText primary="Mejorar" />
        </ListItemButton>
      )}
      <ListItemButton onClick={handleCollect} disabled={handleDisableCollectBotton}>
        <ListItemText primary="Recoger" />
      </ListItemButton>
    </List>
  );
}
