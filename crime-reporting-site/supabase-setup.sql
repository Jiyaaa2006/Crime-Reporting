-- ============================================================
-- SafeReport Database Setup
-- Copy this ENTIRE file and run it in Supabase SQL Editor
-- ============================================================

-- 1. Table to store crime reports
create table crime_reports (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) not null,
  title text not null,
  crime_type text not null,
  location text not null,
  incident_date date not null,
  description text not null,
  status text not null default 'Pending',
  created_at timestamp with time zone default now()
);

-- 2. Table to mark admin users (regular users are NOT admins by default)
create table profiles (
  id uuid primary key references auth.users(id),
  is_admin boolean default false
);

-- 3. Automatically create a profile row whenever someone signs up
create function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, is_admin) values (new.id, false);
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- 4. Turn on Row Level Security (so users can only see what they should)
alter table crime_reports enable row level security;
alter table profiles enable row level security;

-- 5. Policy: users can insert their own reports
create policy "Users can insert their own reports"
on crime_reports for insert
with check (auth.uid() = user_id);

-- 6. Policy: users can view their own reports
create policy "Users can view their own reports"
on crime_reports for select
using (auth.uid() = user_id);

-- 7. Policy: admins can view ALL reports
create policy "Admins can view all reports"
on crime_reports for select
using (
  exists (select 1 from profiles where id = auth.uid() and is_admin = true)
);

-- 8. Policy: admins can update ANY report (to change status)
create policy "Admins can update all reports"
on crime_reports for update
using (
  exists (select 1 from profiles where id = auth.uid() and is_admin = true)
);

-- 9. Policy: users can view their own profile
create policy "Users can view own profile"
on profiles for select
using (auth.uid() = id);

-- ============================================================
-- HOW TO MAKE YOURSELF ADMIN (run this AFTER you sign up once):
-- Replace the email below with your own login email, then run:
--
-- update profiles set is_admin = true
-- where id = (select id from auth.users where email = 'your-email@example.com');
-- ============================================================
