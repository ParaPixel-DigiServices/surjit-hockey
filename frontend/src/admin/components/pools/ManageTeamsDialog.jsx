// src/admin/components/pools/ManageTeamsDialog.jsx
import React, { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical } from "lucide-react";

/** Sortable item */
function SortableItem({ id, team, onRemove }) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition
  };

  return (
    <div ref={setNodeRef} style={style} className="flex items-center gap-3 bg-[#0b1530] p-3 rounded-md border border-white/6">
      <div className="w-10 h-10 flex items-center justify-center rounded-md bg-white/5">
        {team.logo ? <img src={team.logo} alt={team.name} className="w-full h-full object-contain" /> : team.name[0]}
      </div>

      <div className="flex-1">
        <div className="text-white font-semibold">{team.name}</div>
      </div>

      <div className="flex items-center gap-2">
        <button {...listeners} {...attributes} className="p-2 rounded hover:bg-white/6">
          <GripVertical size={16} />
        </button>
        <button onClick={() => onRemove(team.id)} className="text-sm text-red-400 px-2 py-1 rounded hover:bg-red-500/10">Remove</button>
      </div>
    </div>
  );
}

/**
 * ManageTeamsDialog
 * props:
 * - open, onClose, pool, allTeams, onSave(updatedTeams)
 */
export default function ManageTeamsDialog({ open, onClose, pool, allTeams = [], onSave }) {
  const [items, setItems] = useState(pool?.teams || []);
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, { coordinateGetter: undefined })
  );

  useEffect(() => {
    setItems(pool?.teams ? [...pool.teams] : []);
  }, [pool, open]);

  function handleRemove(id) {
    setItems(prev => prev.filter(t => t.id !== id));
  }

  function handleAdd(team) {
    if (!items.find(t => t.id === team.id)) {
      setItems(prev => [...prev, team]);
    }
  }

  function handleDragEnd(event) {
    const { active, over } = event;
    if (!over) return;
    if (active.id !== over.id) {
      const oldIndex = items.findIndex(i => String(i.id) === String(active.id));
      const newIndex = items.findIndex(i => String(i.id) === String(over.id));
      setItems(prev => arrayMove(prev, oldIndex, newIndex));
    }
  }

  function save() {
    onSave(items);
    onClose();
  }

  // available teams to add (not already in pool)
  const available = allTeams.filter(t => !items.find(x => x.id === t.id));

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="bg-[#071226] text-white max-w-3xl">
        <DialogHeader>
          <DialogTitle>Manage Teams — {pool?.name}</DialogTitle>
        </DialogHeader>

        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <div className="text-sm text-white/70 mb-2">Teams in pool (drag to reorder)</div>

            <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
              <SortableContext items={items.map(i => i.id)} strategy={verticalListSortingStrategy}>
                <div className="space-y-2">
                  {items.map(item => (
                    <SortableItem key={item.id} id={String(item.id)} team={item} onRemove={handleRemove} />
                  ))}
                  {items.length === 0 && <div className="text-white/60 p-4 rounded-md border border-white/6">No teams in this pool yet.</div>}
                </div>
              </SortableContext>
            </DndContext>
          </div>

          <div>
            <div className="text-sm text-white/70 mb-2">Available teams</div>
            <div className="space-y-2 max-h-80 overflow-y-auto">
              {available.map(t => (
                <div key={t.id} className="flex items-center justify-between bg-[#0b1530] p-3 rounded-md border border-white/6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-white/5 rounded-md flex items-center justify-center">{t.name[0]}</div>
                    <div className="text-white">{t.name}</div>
                  </div>
                  <button onClick={() => handleAdd(t)} className="bg-[#ffd700] text-[#071226] px-3 py-1 rounded-md">Add</button>
                </div>
              ))}
              {available.length === 0 && <div className="text-white/60">No more teams available</div>}
            </div>
          </div>
        </div>

        <div className="mt-4 flex gap-2">
          <Button onClick={save} className="bg-[#ffd700] text-black">Save</Button>
          <Button onClick={onClose}>Cancel</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
