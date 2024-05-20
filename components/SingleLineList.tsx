import { SingleLineItem } from "@/app/interfaces";
import React from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface Props {
  data: SingleLineItem[];
}

export default function SingleLineList({ data }: Props) {
  return (
    <Table>
      <TableHeader className="">
        <TableRow>
          <TableHead>Service</TableHead>
          <TableHead>Username</TableHead>
          <TableHead>Password</TableHead>
          <TableHead>Purpose</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((item) => (
          <TableRow key={item.id}>
            <TableCell>{item.service}</TableCell>
            <TableCell>{item.username}</TableCell>
            <TableCell>{item.password}</TableCell>
            <TableCell>{item.purpose}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
