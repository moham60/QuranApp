import { Card, CardContent, CardHeader, CardMedia, Typography } from "@mui/material";

export default function CardPrayer({title,time,img}) {
  return (
    <div>
      <Card
        className="dark:!bg-gray-900  bg-white !shadow-2xl"
        sx={{ maxWidth: 345 }}>
        <CardMedia
          component="img"
          sx={{ height: "200px", objectFit: "cover", objectPosition: "center" }}
          image={img}
        />
        <CardContent>
          <Typography
            variant="body1"
            className="dark:!text-white"
            sx={{ fontWeight: "bold" }}>
            {title}
          </Typography>
          <Typography
            variant="body2"
            className="dark:!text-gray-400"
            >
            {time}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
}
