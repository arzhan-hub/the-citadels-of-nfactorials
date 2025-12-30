import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const name = searchParams.get('name') || '';
  const type = searchParams.get('type') || '';
  const dimension = searchParams.get('dimension') || '';
  const page = searchParams.get('page') || '1';

  const query = new URLSearchParams({ page });
  if (name) {
    query.set('name', name);
  }
  if (type) {
    query.set('type', type);
  }
  if (dimension) {
    query.set('dimension', dimension);
  }

  try {
    const res = await fetch(`https://rickandmortyapi.com/api/location/?${query}`);

    if (!res.ok) {
      return NextResponse.json({ results: [], info: {} }, { status: 200 });
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
  }
}
