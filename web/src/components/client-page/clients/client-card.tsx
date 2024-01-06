import { Card, Typography } from "@mui/material";
import { Client } from "./types";

interface Props {
  client: Client;
}

const clientCard: React.FunctionComponent<Props> = ({ client }) => {
  console.log(client);
  return (
    <Card
      key={client.name}
      sx={{
        padding: "20px",
        marginBottom: "20px",
      }}
    >
      <Typography variant="h6" component="h6" fontWeight={700}>
        {client.name}
      </Typography>
      <Typography variant="body1" component="p">
        {client.phone}
      </Typography>
      <Typography variant="body1" component="p">
        {client.email}
      </Typography>
      <Typography variant="body1" component="p">
        {client.address}
      </Typography>
    </Card>
  );
};
export default clientCard;
