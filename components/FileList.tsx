"use client";
import React from "react";
import { File } from "@/app/interfaces";
import prettyBytes from "pretty-bytes";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { MdDownload } from "react-icons/md";
import { format } from "date-fns";
import { createClient } from "@/utils/supabase/client";
import { Button } from "./ui/button";

type Props = {
  data: File[];
  bucketName: string;
};

export default function FileList({ data, bucketName }: Props) {
  const supabase = createClient();

  const handleDownload = async (fileName: string) => {
    const { data: downloadData, error } = await supabase.storage
      .from(bucketName)
      .download(fileName);

    if (error) {
      console.error("Error downloading file:", error);
      return;
    }

    const url = window.URL.createObjectURL(downloadData);
    const a = document.createElement("a");
    a.href = url;
    a.download = fileName;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>File name</TableHead>
          <TableHead>Size</TableHead>
          <TableHead>Last modified</TableHead>
          <TableHead aria-label="Download" />
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((file) => (
          <TableRow key={file.id}>
            <TableCell>{file.name}</TableCell>
            <TableCell>{prettyBytes(file.metadata.size)}</TableCell>
            <TableCell>
              {format(new Date(file.metadata.lastModified), "Pp")}
            </TableCell>
            <TableCell>
              <Button onClick={() => handleDownload(file.name)}>
                <MdDownload
                  className="text-accent"
                  aria-label={`Download ${file.name}`}
                />
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
