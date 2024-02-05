import { DateTime } from "luxon";

export default function GMTtoBrazil(gmtDate: Date) {
  const stringDate = gmtDate.toISOString();
  const gmtDateTime = DateTime.fromISO(stringDate, { zone: "UTC" });

  const brazilDateTime = gmtDateTime.setZone("America/Sao_Paulo");

  return brazilDateTime.toFormat('dd/MM/yy')
}
