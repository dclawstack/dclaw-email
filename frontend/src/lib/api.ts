const API_BASE = process.env.NEXT_PUBLIC_API_URL || "";

class ApiError extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}

async function fetchJson<T>(path: string, options?: RequestInit): Promise<T> {
  const url = `${API_BASE}${path}`;
  const response = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      ...options?.headers,
    },
    ...options,
  });
  if (!response.ok) {
    const error = await response.text();
    throw new ApiError(`API error ${response.status}: ${error}`, response.status);
  }
  if (response.status === 204) return undefined as T;
  return response.json();
}

// ── Health ──────────────────────────────────────────────────────────────────

export async function getHealth() {
  return fetchJson<{ status: string }>("/health/");
}

// ── Types ────────────────────────────────────────────────────────────────────

export interface Account {
  id: string;
  provider: string;
  email: string;
  display_name: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Thread {
  id: string;
  account_id: string;
  thread_id: string;
  subject: string | null;
  last_message_at: string | null;
  message_count: number;
  unread_count: number;
  created_at: string;
}

export interface Message {
  id: string;
  account_id: string;
  thread_id: string | null;
  message_id: string;
  from_address: string;
  to_addresses: string | null;
  cc_addresses: string | null;
  subject: string | null;
  snippet: string | null;
  body_text: string | null;
  body_html: string | null;
  received_at: string | null;
  is_read: boolean;
  is_starred: boolean;
  is_archived: boolean;
  labels: Record<string, unknown> | null;
  created_at: string;
}

export interface Label {
  id: string;
  account_id: string;
  name: string;
  color: string | null;
  is_system: boolean;
  created_at: string;
}

export interface PagedResult<T> {
  items: T[];
  total: number;
}

// ── Accounts ─────────────────────────────────────────────────────────────────

export async function listAccounts(): Promise<Account[]> {
  return fetchJson<Account[]>("/api/v1/accounts/");
}

export async function createAccount(data: {
  provider: string;
  email: string;
  display_name?: string;
}): Promise<Account> {
  return fetchJson<Account>("/api/v1/accounts/", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function getAccount(id: string): Promise<Account> {
  return fetchJson<Account>(`/api/v1/accounts/${id}`);
}

export async function deleteAccount(id: string): Promise<void> {
  return fetchJson<void>(`/api/v1/accounts/${id}`, { method: "DELETE" });
}

// ── Messages ─────────────────────────────────────────────────────────────────

export async function listMessages(params: {
  account_id: string;
  archived?: boolean;
  limit?: number;
  offset?: number;
}): Promise<PagedResult<Message>> {
  const qs = new URLSearchParams({
    account_id: params.account_id,
    ...(params.archived !== undefined && { archived: String(params.archived) }),
    ...(params.limit !== undefined && { limit: String(params.limit) }),
    ...(params.offset !== undefined && { offset: String(params.offset) }),
  });
  return fetchJson<PagedResult<Message>>(`/api/v1/messages/?${qs}`);
}

export async function getMessage(id: string): Promise<Message> {
  return fetchJson<Message>(`/api/v1/messages/${id}`);
}

export async function updateMessage(
  id: string,
  data: { is_read?: boolean; is_starred?: boolean; is_archived?: boolean }
): Promise<Message> {
  return fetchJson<Message>(`/api/v1/messages/${id}`, {
    method: "PATCH",
    body: JSON.stringify(data),
  });
}

export async function deleteMessage(id: string): Promise<void> {
  return fetchJson<void>(`/api/v1/messages/${id}`, { method: "DELETE" });
}

// ── Threads ──────────────────────────────────────────────────────────────────

export async function listThreads(params: {
  account_id: string;
  limit?: number;
  offset?: number;
}): Promise<PagedResult<Thread>> {
  const qs = new URLSearchParams({
    account_id: params.account_id,
    ...(params.limit !== undefined && { limit: String(params.limit) }),
    ...(params.offset !== undefined && { offset: String(params.offset) }),
  });
  return fetchJson<PagedResult<Thread>>(`/api/v1/threads/?${qs}`);
}

export async function getThread(id: string): Promise<Thread> {
  return fetchJson<Thread>(`/api/v1/threads/${id}`);
}

export async function getThreadMessages(threadId: string): Promise<Message[]> {
  return fetchJson<Message[]>(`/api/v1/threads/${threadId}/messages`);
}

// ── Labels ───────────────────────────────────────────────────────────────────

export async function listLabels(accountId: string): Promise<PagedResult<Label>> {
  return fetchJson<PagedResult<Label>>(`/api/v1/labels/?account_id=${accountId}`);
}

export async function createLabel(data: {
  account_id: string;
  name: string;
  color?: string;
}): Promise<Label> {
  return fetchJson<Label>("/api/v1/labels/", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function deleteLabel(id: string): Promise<void> {
  return fetchJson<void>(`/api/v1/labels/${id}`, { method: "DELETE" });
}

export { ApiError };
