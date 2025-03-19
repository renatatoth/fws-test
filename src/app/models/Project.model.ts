import { Contact } from './Contact.model';
import { Status } from './Status.model';

export interface Project {
  id?: string;
  name: string;
  description: string;
  status: Status;
  contacts?: Contact[];
}
