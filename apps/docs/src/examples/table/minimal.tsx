import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@ho-dev/primitives';

export function TableMinimal() {
  return (
    <Table>
      <caption className="sr-only">Team members</caption>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Role</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>Ada Lovelace</TableCell>
          <TableCell>Engineer</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Grace Hopper</TableCell>
          <TableCell>Compiler engineer</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}
