import { ApiListResType, ApiResType } from './api';
import { UserTypeShort } from '../../../features/User/types';
import { AttachmentType } from '../../../components/AttachmentList/components/Attachment';
import {
  Department,
  DepartmentShort,
  Ticket,
  TicketRating,
  TicketStatus,
  Topic,
  UserRole,
} from '../../../features/HelpDeskScreen/reducers';

type CommentRole = 'support' | 'user';

export interface CreateTicketParams {
  ecofeedbackDepartmentId: number;
  subject: string;
  description: string;
  attachments?: string[]; // SGID array
  ecofeedbackTopicId?: number;
}

export interface CreateCommentParams {
  description: string;
  attachments?: AttachmentType[];
}

interface HelpDeskCommentDetail {
  message: string;
  attachments?: AttachmentType[];
}

export interface HelpDeskComment {
  commentatorName: string;
  createdAt: string;
  role: CommentRole;
  content: HelpDeskCommentDetail;
}

export interface ApiDepartment extends DepartmentShort {
  svg: string;
}

export interface HelpdeskTicket {
  id: number;
  subject: string;
  status: TicketStatus;
  createdAt: string;
  updatedAt: string;
  ecofeedbackDepartment: Department;
  user: UserTypeShort;
  comments: HelpDeskComment[];
  ecofeedbackTopic?: Topic;
}

export interface UpdateTicketParams {
  id: number;
  status?: TicketStatus;
  rating?: TicketRating;
}

export type FetchTickets = ApiListResType<Ticket[]>;
export type FetchRoles = ApiListResType<UserRole[]>;
export type FetchTicket = ApiListResType<HelpdeskTicket>;
export type CreateTicket = ApiResType<Ticket>;
export type CreateComment = ApiResType<HelpDeskComment>;
export type FetchDepartments = ApiListResType<Department[]>;
