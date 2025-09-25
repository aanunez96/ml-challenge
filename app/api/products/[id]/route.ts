import { NextRequest, NextResponse } from 'next/server'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  
  // TODO: Fetch product by ID
  return NextResponse.json({ id, name: `Product ${id}` })
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const body = await request.json()
  
  // TODO: Update product
  return NextResponse.json({ id, ...body })
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  
  // TODO: Delete product
  return NextResponse.json({ message: `Product ${id} deleted` })
}