import { ManageTable } from '@/components/manage/manageTable';
import { PageTitle } from '@/components/route';
import React from 'react';
import { useUserList } from '@/hooks/useUserList';

const Manage = async ({
  searchParams,
}: { searchParams: { page?: string; pageSize?: string; search?: string } }) => {
  const page = Number(searchParams.page) || 1;
  const pageSize = Number(searchParams.pageSize) || 10;
  const search = searchParams.search || '';

  const { users, totalCount, totalPages } = await useUserList({
    page,
    pageSize,
    search,
  });

  return (
    <>
      <div className="flex items-center justify-between">
        <PageTitle />
      </div>
      <div>
        <ManageTable
          users={users}
          totalCount={totalCount}
          totalPages={totalPages}
          search={search}
        />
      </div>
    </>
  );
};

export default Manage;
