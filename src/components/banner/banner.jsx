import React from "react";
import { Box, Typography } from "@mui/material";
import bannerImage from "../../assets/images/banner.png"; // Ruta correcta de la imagen

const Banner = () => {
  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        height: "250px", // Ajusta la altura del banner
        backgroundImage: `url(${bannerImage})`, 
        backgroundSize: "cover",
        backgroundPosition: "center",
        color: "white",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
     
    </Box>
  );
};

export default Banner;
