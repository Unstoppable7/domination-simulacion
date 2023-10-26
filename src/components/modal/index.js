import * as React from "react";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import NestedList from "../list";
import { DialogContent } from "@mui/material";

//Por que el export default aqui? @adrian
export default function InformationDialog({
  open,
  handleClose,
  name,
  showImproveOption,
  handleCollect, 
  handleUpgrade, 
  handleDisableCollectBotton,
  handleDisableUpgradeBotton

}) {
  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>{name}</DialogTitle>

      <DialogContent style={{ width: 400 }}>
        <NestedList showImproveOption={showImproveOption} handleCollect={handleCollect} handleUpgrade={handleUpgrade} handleDisableCollectBotton={handleDisableCollectBotton} handleDisableUpgradeBotton={handleDisableUpgradeBotton}/>
      </DialogContent>
    </Dialog>
  );
}
