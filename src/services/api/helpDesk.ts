import Api from './api';
import {
  Ticket,
  Department,
  UserRole,
  TicketStatus,
} from '../../features/HelpDeskScreen/reducers';
import {
  FetchTickets,
  FetchTicket,
  CreateTicket,
  CreateTicketParams,
  CreateComment,
  CreateCommentParams,
  FetchDepartments,
  HelpdeskTicket,
  HelpDeskComment,
  UpdateTicketParams,
  FetchRoles,
} from './types/helpDesk';

export interface FetchTicketsParams {
  page: number;
  status?: TicketStatus;
}
export default class HelpDeskApi extends Api {
  path: string;

  constructor() {
    super();
    this.path = `/helpdesks`;
  }

  async fetchRoles(): Promise<FetchRoles> {
    const res = await this.request<UserRole[]>({
      path: `${this.path}/roles`,
      method: 'GET',
    });
    if (res.status === 'success') {
      this.store.dispatch({
        type: 'helpDesk/setRoles',
        payload: res.result.data,
      });
    }
    return res;
  }

  // Fetch all tickets for the current user
  async fetchTickets(params?: FetchTicketsParams): Promise<FetchTickets> {
    const res = await this.request<Ticket[]>({
      path: `${this.path}/tickets`,
      params,
      method: 'GET',
    });
    return res;
  }

  async fetchTicket(id: number): Promise<FetchTicket> {
    const res = await this.request<HelpdeskTicket>({
      path: `${this.path}/tickets/${id}`,
      method: 'GET',
    });
    return res;
  }

  // Create a new ticket
  async createTicket(params: CreateTicketParams): Promise<CreateTicket> {
    const res = await this.request<Ticket>({
      path: `${this.path}/tickets`,
      method: 'POST',
      body: params,
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return res;
  }

  // Create a new comment for a ticket
  async createComment(
    ticketId: number,
    params: CreateCommentParams,
  ): Promise<CreateComment> {
    const res = await this.request<HelpDeskComment>({
      path: `${this.path}/tickets/${ticketId}/comments`,
      method: 'POST',
      body: params,
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return res;
  }

  // Fetch all tickets for the current user
  async fetchDepartments(): Promise<FetchDepartments> {
    const res = await this.request<Department[]>({
      path: `${this.path}/departments`,
      method: 'GET',
    });
    return res;
  }

  async updateTicket(params: UpdateTicketParams): Promise<any> {
    const { id, rating, status } = params;
    const res = await this.request<any>({
      path: `${this.path}/tickets/${id}`,
      method: 'PATCH',
      params: {
        rating,
        status,
      },
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return res;
  }
}
