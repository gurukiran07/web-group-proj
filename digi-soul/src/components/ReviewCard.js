/**
 * @author Amanjot Singh
 **/

import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

export default function EventCard(props) {
  const { id, name, brief, imageURL } = props;
  return (
    <Card sx={{ maxWidth: 600, margin: "0 auto" }}>
      <CardMedia
        sx={{ objectFit: "cover" }}
        component="img"
        alt="Review Image"
        height="200"
        image={imageURL}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {brief}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Save</Button>
        <Button size="small" href={`/review/${id}`}>
          More Details
        </Button>
      </CardActions>
    </Card>
  );
}
