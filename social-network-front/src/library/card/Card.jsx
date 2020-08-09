import { styled, CardMedia } from "@material-ui/core";
import { Card } from "@material-ui/core";
import { CardActions } from "@material-ui/core";
import { CardHeader } from "@material-ui/core";
import { CardContent } from "@material-ui/core";

export const ICard = styled(Card)({
  width: "100%",
  maxWidth: 720,
});

export const ICardHeader = styled(CardHeader)({
  padding: "8px",
});

export const ICardContent = styled(CardContent)({
  padding: "8px",
});

export const ICardMedia = styled(CardMedia)({
  height: 0,
  paddingTop: "100%",
});

export const ICardActions = styled(CardActions)({
  padding: "0px",
});
