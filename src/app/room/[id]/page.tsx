type PageProps = {
  params: Promise<{ id: string }>;
};
export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return <div>{`Room name: ${id}`}</div>;
}
