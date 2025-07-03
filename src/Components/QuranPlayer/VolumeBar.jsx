import * as React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

import Slider from "@mui/material/Slider";

import VolumeUp from "@mui/icons-material/VolumeUp";




export default function VolumeBar({value,onChange,min,max,setVolume}) {
 





  return (
    <Box sx={{ width: 170 }}>
     
      <Grid container spacing={2} sx={{ alignItems: "center" }}>
        <Grid>
          <VolumeUp  />
        </Grid>
        <Grid size="grow">
          <Slider
            value={typeof value === "number" ? value : 0}
            onChange={onChange}
            aria-labelledby="input-slider"
          />
        </Grid>
        
      </Grid>
    </Box>
  );
}
