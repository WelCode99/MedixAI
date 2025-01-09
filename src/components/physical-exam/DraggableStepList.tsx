import React from 'react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical } from 'lucide-react';
import { ExamStep } from '../../types/physical-exam';

interface SortableItemProps {
  id: string;
  children: React.ReactNode;
}

const SortableItem: React.FC<SortableItemProps> = ({ id, children }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="relative bg-white rounded-lg shadow-sm"
    >
      <div
        {...attributes}
        {...listeners}
        className="absolute left-0 top-0 bottom-0 w-8 flex items-center justify-center cursor-grab active:cursor-grabbing"
      >
        <GripVertical className="w-4 h-4 text-gray-400" />
      </div>
      {children}
    </div>
  );
};

interface DraggableStepListProps {
  steps: ExamStep[];
  onReorder: (steps: ExamStep[]) => void;
  children: (step: ExamStep) => React.ReactNode;
}

export const DraggableStepList: React.FC<DraggableStepListProps> = ({
  steps,
  onReorder,
  children
}) => {
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    
    if (active.id !== over.id) {
      const oldIndex = steps.findIndex(step => step.id === active.id);
      const newIndex = steps.findIndex(step => step.id === over.id);
      
      onReorder(arrayMove(steps, oldIndex, newIndex));
    }
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={steps.map(step => step.id)}
        strategy={verticalListSortingStrategy}
      >
        <div className="space-y-4">
          {steps.map(step => (
            <SortableItem key={step.id} id={step.id}>
              {children(step)}
            </SortableItem>
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
};