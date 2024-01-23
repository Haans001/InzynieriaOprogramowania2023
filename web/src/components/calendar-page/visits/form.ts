import { Visit } from "src/api/visits";
import * as Yup from "yup";

function isOverlap(newStartTime: string, newEndTime: string, visits: Visit[]) {
  // Convert new start and end times to Date objects
  const newStartDate = new Date(newStartTime);
  const newEndDate = new Date(newEndTime);

  // Check if the new time range overlaps with any existing visits for the same service
  return visits.some(
    (visit) =>
      newStartDate < new Date(visit.time_end) &&
      newEndDate > new Date(visit.time_start),
  );
}

export const validationSchema = (visits: Visit[], day: string) =>
  Yup.object({
    time_start: Yup.string()
      .required("Pole wymagane")
      .test(
        "start-greater-than-now",
        "Czas rozpoczęcia musi być późniejszy niż obecny czas",
        function (value) {
          const { visitTimeStart } = getVisitHours(day, value, value);
          return !value || new Date() < visitTimeStart;
        },
      ),
    time_end: Yup.string()
      .required("Pole wymagane")
      .test(
        "is-greater",
        "Czas zakończenia musi być późniejszy niż czas rozpoczęcia",
        function (value) {
          const { time_start } = this.parent;
          console.log(time_start, value);
          return (
            !time_start || !value || new Date(time_start) < new Date(value)
          );
        },
      )
      .test(
        "is-overlap",
        "Wizyta nie może nakładać się z inną wizytą",
        function (value) {
          const { time_start } = this.parent;
          return !isOverlap(time_start, value, visits);
        },
      ),
    note: Yup.string().optional(),
    service_id: Yup.string().required("Pole wymagane"),
    client_id: Yup.string().required("Pole wymagane"),
    employee_id: Yup.string().required("Pole wymagane"),
  });

export const getInitialValues = (visit: Visit) => ({
  time_start: visit?.time_start ?? "",
  time_end: visit?.time_end ?? "",
  note: visit?.note ?? "",
  service_id: "",
  client_id: visit?.user?.id.toString() ?? "",
  employee_id: visit?.Employee?.id.toString() ?? "",
});

export const getVisitHours = (
  day: string,
  time_start: string,
  time_end: string,
) => {
  const visitTimeStart = new Date(day);
  const visitTimeEnd = new Date(day);

  visitTimeStart.setUTCHours(new Date(time_start).getUTCHours());
  visitTimeStart.setUTCMinutes(new Date(time_start).getUTCMinutes());

  visitTimeEnd.setUTCHours(new Date(time_end).getUTCHours());
  visitTimeEnd.setUTCMinutes(new Date(time_end).getUTCMinutes());

  return {
    visitTimeStart,
    visitTimeEnd,
  };
};
