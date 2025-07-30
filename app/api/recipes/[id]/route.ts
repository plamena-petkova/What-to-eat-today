import { supabase } from '@/lib/supabase';
import { NextResponse } from 'next/server';

type Props = {
    id:string
}

export async function GET(
  request: Request,
  { params }: { params: Props }
) {
  const { id } = await params;

  const { data, error } = await supabase
    .from('recipes')
    .select('*')
    .eq('id', id)
    .single(); 

  if (error || !data) {
    return NextResponse.json({ error: 'Recipe not found' }, { status: 404 });
  }

  return NextResponse.json(data);
}
