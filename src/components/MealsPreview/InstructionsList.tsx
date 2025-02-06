import { DndContext, DragEndEvent, closestCenter } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";
import { List, Button, Box } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import SortableInstructionItem from "./SortableInstructionItem";

type InstructionsListProps = {
  instructions: string[];
  onChange: (newList: string[]) => void;
};

export default function InstructionsList({
  instructions,
  onChange,
}: InstructionsListProps) {
  const handleAdd = () => {
    onChange([...instructions, ""]);
  };

  const handleDelete = (index: number) => {
    const updated = instructions.filter((_, i) => i !== index);
    onChange(updated);
  };

  const handleChangeValue = (index: number, newValue: string) => {
    const updated = [...instructions];
    updated[index] = newValue;
    onChange(updated);
  };

  // Poprawione - używamy Number() zamiast parseInt()
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = Number(active.id);
    const newIndex = Number(over.id);

    const reordered = arrayMove(instructions, oldIndex, newIndex);
    onChange(reordered);
  };

  return (
    <Box>
      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext
          items={instructions.map((_, i) => i.toString())}
          strategy={verticalListSortingStrategy}
        >
          <List sx={{ bgcolor: "#fafafa" }}>
            {instructions.map((instr, i) => (
              <SortableInstructionItem
                key={String(i)}
                id={String(i)}
                index={i}
                value={instr}
                onChangeValue={(newVal) => handleChangeValue(i, newVal)}
                onDelete={() => handleDelete(i)}
              />
            ))}
          </List>
        </SortableContext>
      </DndContext>

      <Button startIcon={<AddCircleIcon />} onClick={handleAdd} sx={{ mt: 2 }}>
        Dodaj instrukcję
      </Button>
    </Box>
  );
}
