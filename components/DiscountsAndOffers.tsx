import React from "react";

import { DiscountsAndOffersItem } from "@/app/interfaces";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface Props {
  data: DiscountsAndOffersItem[];
}

export default function DiscountsAndOffers({ data }: Props) {
  return (
    <Table>
      <TableHeader className="">
        <TableRow>
          <TableHead>Website / Company</TableHead>
          <TableHead>Discount Code</TableHead>
          <TableHead>Info</TableHead>
          <TableHead>Expiration date</TableHead>
          <TableHead>Uploaded by</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((item) => (
          <TableRow key={item.id}>
            <TableCell>{item.company}</TableCell>
            <TableCell>{item.discount_code}</TableCell>
            <TableCell>{item.info}</TableCell>
            {/* @ts-ignore */}
            <TableCell>{item.expires_at}</TableCell>
            <TableCell>{item.author_id.full_name}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
