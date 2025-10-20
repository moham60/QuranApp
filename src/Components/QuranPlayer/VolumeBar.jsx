import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

import Slider from "@mui/material/Slider";

import VolumeUp from "@mui/icons-material/VolumeUp";

import { useTheme } from "@mui/material/styles";



export default function VolumeBar({value,onChange,min,max,setVolume}) {
 


  const theme = useTheme();

  // نحدد الألوان حسب المود
  const sliderColor =
    theme.palette.mode === "dark"?"#007a55":"#007a55";


  return (
    <Box  sx={{ width: 170 }}>
     
      <Grid container spacing={2} sx={{ alignItems: "center" }}>
        <Grid>
          <VolumeUp sx={{color:sliderColor}}  />
        </Grid>
        <Grid size="grow">
          <Slider
            sx={{color:sliderColor}}
            value={typeof value === "number" ? value : 0}
            onChange={onChange}
            aria-labelledby="input-slider"
          />
        </Grid>
        
      </Grid>
    </Box>
  );
}
