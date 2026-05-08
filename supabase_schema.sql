-- Create 'projects' table
create table public.projects (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) not null,
  name text not null,
  target_url text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create 'project_backlinks' table
create table public.project_backlinks (
  id uuid default gen_random_uuid() primary key,
  project_id uuid references public.projects(id) on delete cascade not null,
  site_id integer not null,
  status text check (status in ('pending', 'outreach', 'live', 'rejected')) default 'pending',
  contact_email text,
  contact_url text,
  notes text default '',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique(project_id, site_id) -- A project can only have one tracking record per site
);

-- Set up Row Level Security (RLS)
alter table public.projects enable row level security;
alter table public.project_backlinks enable row level security;

-- Create Policies for 'projects'
create policy "Users can view their own projects" on public.projects
  for select using (auth.uid() = user_id);

create policy "Users can insert their own projects" on public.projects
  for insert with check (auth.uid() = user_id);

create policy "Users can update their own projects" on public.projects
  for update using (auth.uid() = user_id);

create policy "Users can delete their own projects" on public.projects
  for delete using (auth.uid() = user_id);

-- Create Policies for 'project_backlinks'
create policy "Users can view backlinks of their projects" on public.project_backlinks
  for select using (
    project_id in (select id from public.projects where user_id = auth.uid())
  );

create policy "Users can insert backlinks for their projects" on public.project_backlinks
  for insert with check (
    project_id in (select id from public.projects where user_id = auth.uid())
  );

create policy "Users can update backlinks of their projects" on public.project_backlinks
  for update using (
    project_id in (select id from public.projects where user_id = auth.uid())
  );

create policy "Users can delete backlinks of their projects" on public.project_backlinks
  for delete using (
    project_id in (select id from public.projects where user_id = auth.uid())
  );
