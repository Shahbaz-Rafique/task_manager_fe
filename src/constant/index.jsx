import { CheckCircleOutlined } from '@ant-design/icons';


const progressOne = [
  { percent: 75 }
];

const Fourprogresses = [
  { percent: 25, title: "Title 1" },
  { percent: 50, title: "Title 2" },
  { percent: 75, title: "Title 3" },
  { percent: 100, title: "Title 4" }
];


const taskList = [
  {
    icon: <CheckCircleOutlined />,
    label: 'task title ',
    day: 'Today',
  },
  {
    icon: <CheckCircleOutlined />,
    label: 'task title ',
    day: 'Today',
  },
  {
    icon: <CheckCircleOutlined />,
    label: 'task title ',
    day: 'Tomorrow',
  },
  {
    icon: <CheckCircleOutlined />,
    label: 'task title ',
    day: 'Tomorrow',
  },
]


const status = [
  {
    icon: 1,
    label: 'task title ',
    day: 'Today',
  },
  {
    icon: 2,
    label: 'task title ',
    day: 'Today',
  },
  {
    icon: 3,
    label: 'task title ',
    day: 'Tomorrow',
  },
  {
    icon: 4,
    label: 'task title ',
    day: 'Tomorrow',
  },
]


export { progressOne, Fourprogresses, taskList,status };
