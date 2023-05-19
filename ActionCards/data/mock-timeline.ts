import { IAction } from '../utils/interfaces';

export const mockActions: IAction[] = [
  {
    time: new Date('2023-04-23T10:30:00'),
    duration: '0',
    user: {
      id: '0000-00000',
      name: 'John Doe',
      imageUrl: 'https://randomuser.me/api/portraits/men/1.jpg',
    },
    fields: 0,
    actionName: 'Created record',
  },
  {
    time: new Date('2023-05-10T11:15:00'),
    duration: '0',
    user: {
      id: '0000-00000',
      name: 'Jane Smith',
      imageUrl: 'https://randomuser.me/api/portraits/women/1.jpg',
    },
    fields: 0,
    actionName: 'Updated record',
  },
  {
    time: new Date('2023-02-24T12:00:00'),
    duration: '0',
    user: {
      id: '0000-00000',
      name: 'Alice Johnson',
      imageUrl: 'https://randomuser.me/api/portraits/women/2.jpg',
    },
    fields: 0,
    actionName: 'Assigned record',
  },
  {
    time: new Date('2023-05-10T13:30:00'),
    duration: '0',
    user: {
      id: '0000-00000',
      name: 'Bob Williams',
      imageUrl: 'https://randomuser.me/api/portraits/men/2.jpg',
    },
    fields: 0,
    actionName: 'Created notes',
  },
  {
    time: new Date('2022-05-15T14:45:00'),
    duration: '0',
    user: {
      id: '0000-00000',
      name: 'Cindy Garcia',
      imageUrl: 'https://randomuser.me/api/portraits/women/3.jpg',
    },
    fields: 0,
    actionName: 'Deleted record',
  },
  {
    time: new Date('2021-05-09T15:30:00'),
    duration: '0',
    user: {
      id: '0000-00000',
      name: 'David Lee',
      imageUrl: 'https://randomuser.me/api/portraits/men/3.jpg',
    },
    fields: 0,
    actionName: 'Updated record',
  },
  {
    time: new Date('2023-04-10T16:45:00'),
    duration: '0',
    user: {
      id: '0000-00000',
      name: 'Emily Hernandez',
      imageUrl: 'https://randomuser.me/api/portraits/women/4.jpg',
    },
    fields: 0,
    actionName: 'Reassigned record',
  },
];
