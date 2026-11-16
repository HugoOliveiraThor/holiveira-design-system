import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@ho-dev/primitives';

const orders = [
  { id: 'ORD-1042', customer: 'Acme Corp', total: '$1,240.00' },
  { id: 'ORD-1043', customer: 'Globex', total: '$320.00' },
  { id: 'ORD-1044', customer: 'Initech', total: '$845.50' },
];

export function TableRealistic() {
  return (
    <Table>
      <caption className="sr-only">Open orders with their totals</caption>
      <TableHeader>
        <TableRow>
          <TableHead>Order</TableHead>
          <TableHead>Customer</TableHead>
          <TableHead>Total</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {orders.map((order) => (
          <TableRow key={order.id}>
            <TableCell>{order.id}</TableCell>
            <TableCell>{order.customer}</TableCell>
            <TableCell>{order.total}</TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell>3 open orders</TableCell>
          <TableCell />
          <TableCell>$2,405.50</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}
