import { NextRequest, NextResponse } from 'next/server';
import { Liveblocks } from '@liveblocks/node';
import { LiveObject, LiveList } from '@liveblocks/core';
import { Column, Card } from '@/lib/liveblocksClient'; // Kolon ve Kart tipleri için uygun bir yerden import edin

// Update işlemini yapacak fonksiyon
async function updateRoom(id: string, updateFn: (room: any) => void) {
  const liveblocks = new Liveblocks({ secret: process.env.LIVEBLOCKS_SECRET_KEY as string });
  
  await liveblocks.updateRoom(id, (room: any) => {
    updateFn(room);
  });
}

export async function PUT(req: NextRequest) {
  try {
    const { columnId, newCards } = await req.json();

    if (!columnId || !Array.isArray(newCards)) {
      return NextResponse.json({ message: 'Invalid input' }, { status: 400 });
    }

    await updateRoom(columnId, (room) => {
      const columns = room.get('columns') as LiveList<LiveObject<Column>>;
      const cards = room.get('cards') as LiveList<LiveObject<Card>>;

      // Find the target column
      const targetColumn = columns.find((col) => col.get('id') === columnId);
      if (!targetColumn) {
        throw new Error('Column not found');
      }

      // Add new cards to the column
      newCards.forEach((cardName: string, index: number) => {
        cards.push({
          name: cardName,
          id: uniqid(),
          columnId,
          index,
        });
      });
      
      // Optional: Sort cards by index if needed
      cards.sort((a, b) => a.get('index') - b.get('index'));
    });

    return NextResponse.json({ message: 'Cards added successfully.' });
  } catch (error) {
    console.error('Error adding cards:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
