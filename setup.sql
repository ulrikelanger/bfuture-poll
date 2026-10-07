-- ============================================================
--  ONE-TIME SETUP. In Supabase: SQL Editor > New query >
--  paste this whole file > Run. Then never touch it again.
--
--  Before running: replace CHANGE-ME-PIN on the last line with a
--  PIN only you know. The big-screen page asks for it once.
-- ============================================================

-- Current question per event (-1 = no poll running)
create table if not exists public.poll_state (
  event_id   text primary key,
  q          integer not null default -1,
  updated_at timestamptz not null default now()
);

-- Presenter PIN, never readable by the public
create table if not exists public.poll_secrets (
  event_id text primary key,
  pin      text not null
);

alter table public.poll_state   enable row level security;
alter table public.poll_secrets enable row level security;

-- Everyone may READ the current question; nobody may write directly
drop policy if exists "read state" on public.poll_state;
create policy "read state" on public.poll_state for select using (true);

-- Only someone with the PIN can change the current question
create or replace function public.set_question(p_event text, p_pin text, p_q integer)
returns integer
language plpgsql
security definer
set search_path = public
as $$
begin
  if not exists (select 1 from poll_secrets where event_id = p_event and pin = p_pin) then
    raise exception 'wrong pin';
  end if;
  insert into poll_state (event_id, q, updated_at) values (p_event, p_q, now())
  on conflict (event_id) do update set q = excluded.q, updated_at = now();
  return p_q;
end;
$$;

revoke all on function public.set_question(text, text, integer) from public;
grant execute on function public.set_question(text, text, integer) to anon;

-- Event rows. For a new talk, add a line pair with a new event_id.
insert into public.poll_state (event_id, q) values ('bfuture26', -1)
  on conflict (event_id) do nothing;

insert into public.poll_secrets (event_id, pin) values ('bfuture26', 'CHANGE-ME-PIN')  -- <== your PIN here
  on conflict (event_id) do update set pin = excluded.pin;

-- ------------------------------------------------------------
--  kress pro Innovation Day, Oct 8, 2026 (eventId kresspro26).
--  Run only these two statements, once, with your PIN.
-- ------------------------------------------------------------
insert into public.poll_state (event_id, q) values ('kresspro26', -1)
  on conflict (event_id) do nothing;

insert into public.poll_secrets (event_id, pin) values ('kresspro26', 'CHANGE-ME-PIN')  -- <== your PIN here
  on conflict (event_id) do update set pin = excluded.pin;
