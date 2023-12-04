import { Card, Typography } from "@mui/material";
import { Visit } from "./types";

interface Props {
  visit: Visit;
}

const VisitCard: React.FunctionComponent<Props> = ({ visit }) => {
  console.log(visit);
  return (
    <Card
      key={visit.name}
      sx={{
        padding: "20px",
        marginBottom: "20px",
      }}
    >
      <Typography variant="h6" component="h6" fontWeight={700}>
        {visit.name}
      </Typography>
      <Typography variant="body1" component="p">
        {visit.time_start} - {visit.time_end}
      </Typography>
      <Typography variant="body1" component="p">
        {visit.service}
      </Typography>
      <Typography variant="body1" component="p">
        {visit.phone}
      </Typography>
      <Typography variant="body1" component="p">
        {visit.email}
      </Typography>
    </Card>
  );
};
export default VisitCard;
