import { Absence } from "@/app/interfaces";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type Props = {
  data: Absence[];
};

export default function EmployeeAbsence({ data }: Props) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Start date</TableHead>
          <TableHead>End date</TableHead>
          <TableHead>Reason</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((item) => (
          <TableRow key={item.id}>
            <TableCell>{item.user_id.full_name}</TableCell>
            {/* @ts-ignore */}
            <TableCell>{item.start_date}</TableCell>
            {/* @ts-ignore */}
            <TableCell>{item.end_date}</TableCell>
            <TableCell>{item.reason}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
