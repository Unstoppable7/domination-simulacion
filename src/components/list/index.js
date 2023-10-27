import * as React from "react";
import ListSubheader from "@mui/material/ListSubheader";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { Box, ListItemIcon } from "@mui/material";
import { TypesOfResources } from "../../constants/constants";

export default function NestedList({ showImproveOption = true, handleCollect, handleUpgrade, handleDisableCollectBotton, handleDisableUpgradeBotton, typeOfResource, resourceRequired, villagersRequiredToCollect, villagersRequiredToUpgrade,resourceCollected, timeForCollect}) {
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

          <ListItemText primary={`👨${villagersRequiredToUpgrade}`} />
          <ListItemText primary={
            typeOfResource === TypesOfResources.FOOD
            ? `🍟${resourceRequired}`
            : `💰${resourceRequired}`
            } />

            
        </ListItemButton>
      )}
      <ListItemButton onClick={handleCollect} disabled={handleDisableCollectBotton}>
        <ListItemText primary="Recoger" />
        <ListItemText primary={`👨${villagersRequiredToCollect}`} />
          <ListItemText primary={
            typeOfResource === TypesOfResources.FOOD
            ? `💰${resourceCollected}`
            : `🍟${resourceCollected}`
            } />
        <ListItemText primary={`🕓${timeForCollect}`} />

      </ListItemButton>
    </List>
  );
}
