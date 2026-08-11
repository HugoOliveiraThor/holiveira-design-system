import {
  Avatar,
  AvatarGroup,
  Badge,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@ho-dev/primitives';
import { Card } from '@ho-dev/ui';

import type { Meta, StoryObj } from '@storybook/react';

const rows = [
  {
    user: 'Lindsey Curtis',
    role: 'Web Designer',
    project: 'Agency Website',
    team: 3,
    status: 'Active',
    budget: '3.9K',
  },
  {
    user: 'Kaiya George',
    role: 'Project Manager',
    project: 'Technology',
    team: 2,
    status: 'Pending',
    budget: '24.9K',
  },
  {
    user: 'Zain Geidt',
    role: 'Content Writing',
    project: 'Blog Writing',
    team: 1,
    status: 'Active',
    budget: '12.7K',
  },
  {
    user: 'Abram Schleifer',
    role: 'Digital Marketer',
    project: 'Social Media',
    team: 3,
    status: 'Cancel',
    budget: '2.8K',
  },
];

function BadgeFor({ status }: { status: string }) {
  const variant = status === 'Active' ? 'success' : status === 'Pending' ? 'warning' : 'error';
  return <Badge variant={variant}>{status}</Badge>;
}

const meta: Meta = {
  title: 'Patterns/Tables/Basic Table 1',
  tags: [],
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => (
    <Card className="w-full">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>User</TableHead>
            <TableHead>Project Name</TableHead>
            <TableHead>Team</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Budget</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.user}>
              <TableCell>
                <div className="flex items-center gap-3">
                  <Avatar name={row.user} />
                  <div>
                    <span className="block font-medium text-gray-800 dark:text-white/90">
                      {row.user}
                    </span>
                    <span className="block text-gray-500 dark:text-gray-400">{row.role}</span>
                  </div>
                </div>
              </TableCell>
              <TableCell>{row.project}</TableCell>
              <TableCell>
                <AvatarGroup max={3}>
                  {Array.from({ length: row.team }, (_, i) => (
                    <Avatar key={i} name={`M${i + 1}`} />
                  ))}
                </AvatarGroup>
              </TableCell>
              <TableCell>
                <BadgeFor status={row.status} />
              </TableCell>
              <TableCell>{row.budget}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  ),
};
