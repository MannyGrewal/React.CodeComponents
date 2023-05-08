import { IRadioListData } from "./interfaces";

const mockdata: IRadioListData[] = [
  {
    id: "1",
    name: "Full-time",
    desc: "Working 40 or more hours per week for a single employer, typically with benefits such as healthcare and paid time off. Full-time employees may be eligible for promotions and career advancement opportunities within their company.",
  },
  {
    id: "2",
    name: "Part-time",
    desc: "Working fewer than 40 hours per week for a single employer. Part-time work is often used by students, parents, or others seeking flexibility in their schedules. Part-time employees may be eligible for some benefits, such as retirement plans or tuition reimbursement, depending on their employer.",
  },
  {
    id: "3",
    name: "On-call",
    desc: "Available to work on short notice as needed by an employer",
  },
  {
    id: "4",
    name: "Apprenticeship",
    desc: "On-the-job training, often in a skilled trade or craft",
  },
  {
    id: "5",
    name: "Temp-to-perm",
    desc: "Starting as a temporary worker with the possibility of becoming a permanent employee",
  },
  {
    id: "6",
    name: "Self-employed",
    desc: "Running one's own business or working as a sole proprietor",
  },
  {
    id: "7",
    name: "Freelance",
    desc: "Working on a project-by-project basis for multiple clients. Freelancers typically set their own rates and hours, and may work remotely or on-site. Freelancing can offer flexibility and autonomy, but also requires self-promotion and managing the financial and administrative aspects of running a business.",
  },
  {
    id: "8",
    name: "Volunteer",
    desc: "Unpaid work for a nonprofit or community organization",
  },
  {
    id: "9",
    name: "Gig",
    desc: "Short-term or on-demand work, often facilitated through an app or platform",
  },
  {
    id: "10",
    name: "Seasonal",
    desc: "Working for a limited period of time, often tied to a particular season or event",
  },
  {
    id: "11",
    name: "Permanent",
    desc: "This category is only applicable for full-time employees",
  },
  {
    id: "12",
    name: "Temporary",
    desc: "Select this for roles which are less than 6 weeks",
  },
  { id: "13", name: "Casual", desc: "This only applies to the part-time employees" },
  {
    id: "14",
    name: "Zero-hours",
    desc: "No guaranteed hours of work, with shifts offered on an as-needed basis",
  },

];
export default mockdata;
