import * as React from "react";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import { DialogContent } from "@mui/material";
import CreateList from "../createList";

//Por que el export default aqui? @adrian
export default function CreateTownModal({
  open,
  handleClose,
  name,
  list,
  handleCreateItem,
}) {
  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>{name}</DialogTitle>

      <DialogContent style={{ width: 400 }}>
        <CreateList list={list} handleCreateItem={handleCreateItem} />
      </DialogContent>
    </Dialog>
  );
}
