import React, { useState } from "react";

import { Box, Card, CardContent, Typography } from "@mui/material";
import InformationDialog from "../modal";

const Structure = ({ image, name, data, disabled, showImproveOption }) => {
  const [openInformationModal, setOpenInformationModal] = useState(false);

  return (
    <>
      <Box width={330}>
        <Box mb={3} textAlign="center">
          <Typography variant="h6">{name}</Typography>
        </Box>
        <Card
          onClick={() => !disabled && setOpenInformationModal(true)}
          style={{ cursor: "pointer" }}
        >
          <CardContent>
            <Box textAlign="center">
              <img src={image} alt="town" width={280} height={280} />
            </Box>
          </CardContent>
        </Card>
      </Box>

      <InformationDialog
        name={name}
        open={openInformationModal}
        handleClose={() => {
          setOpenInformationModal(false);
        }}
        showImproveOption={showImproveOption}
      />
    </>
  );
};

export default Structure;
