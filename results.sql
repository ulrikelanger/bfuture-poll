-- ============================================================
--  RESULTS STORAGE. In Supabase: SQL Editor > New query >
--  paste this whole file > Run. Safe to run more than once.
--
--  After that, the big screen saves the vote count for every
--  question automatically. To see them: Table Editor > poll_results.
-- ============================================================

create table if not exists public.poll_results (
  event_id   text    not null,
  q          integer not null,
  question   text,
  a_label    text,
  b_label    text,
  a_count    integer not null default 0,
  b_count    integer not null default 0,
  undecided  integer not null default 0,
  saved_at   timestamptz not null default now(),
  primary key (event_id, q)
);

-- Private: no public read, no public write. Only you see it in Supabase.
alter table public.poll_results enable row level security;

create or replace function public.save_result(
  p_event text, p_pin text, p_q integer,
  p_question text, p_a_label text, p_b_label text,
  p_a integer, p_b integer, p_undecided integer)
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  if not exists (select 1 from poll_secrets where event_id = p_event and pin = p_pin) then
    raise exception 'wrong pin';
  end if;
  insert into poll_results (event_id, q, question, a_label, b_label, a_count, b_count, undecided, saved_at)
  values (p_event, p_q, p_question, p_a_label, p_b_label, p_a, p_b, p_undecided, now())
  on conflict (event_id, q) do update set
    question = excluded.question, a_label = excluded.a_label, b_label = excluded.b_label,
    a_count = excluded.a_count, b_count = excluded.b_count, undecided = excluded.undecided,
    saved_at = now()
  -- never overwrite a bigger count with a smaller one
  -- (e.g. if you jump back to an earlier question after people moved on)
  where excluded.a_count + excluded.b_count >= poll_results.a_count + poll_results.b_count;
end;
$$;

revoke all on function public.save_result(text, text, integer, text, text, text, integer, integer, integer) from public;
grant execute on function public.save_result(text, text, integer, text, text, text, integer, integer, integer) to anon;
