-- board_type 코드(b001 등)를 slug(portfolio 등)로 변경
update public.boards
set board_type = case board_type
  when 'b001' then 'portfolio'
  when 'b002' then 'interview'
  when 'b003' then 'assignment'
  when 'b004' then 'job-worry'
  when 'b005' then 'study'
  when 'b006' then 'qna'
  else board_type
end;
