export type ListAccountsResult = {
  accounts: Array<{
    name: string;
    createTime: string;
    updateTime: string;
    displayName: string;
    regionCode: string;
  }>;
};

export async function listAccounts(access_token: string): Promise<ListAccountsResult> {
  const res = await fetch('https://analyticsadmin.googleapis.com/v1alpha/accounts', {
    method: 'GET',
    headers: new Headers({
      Authorization: 'Bearer ' + access_token,
    }),
  });
  return await res.json();
}
