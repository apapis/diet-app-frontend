import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { ListItem, TextField, IconButton, ListItemText } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";

type SortableInstructionItemProps = {
  id: string;
  index: number;
  value: string;
  onChangeValue: (newVal: string) => void;
  onDelete: () => void;
};

export default function SortableInstructionItem({
  id,
  index,
  value,
  onChangeValue,
  onDelete,
}: SortableInstructionItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id,
    animateLayoutChanges: () => false,
  });

  const style: React.CSSProperties = {
    transform: CSS.Translate.toString(transform),
    transition,
    opacity: isDragging ? 0.7 : 1,
    cursor: "default",
  };

  return (
    <ListItem
      ref={setNodeRef}
      style={style}
      sx={{
        border: "1px solid #ddd",
        mb: 1,
        borderRadius: 1,
      }}
      secondaryAction={
        <IconButton color="error" onClick={onDelete}>
          <DeleteIcon />
        </IconButton>
      }
    >
      <IconButton
        edge="start"
        {...listeners}
        {...attributes}
        sx={{ cursor: "grab" }}
      >
        <DragIndicatorIcon />
      </IconButton>

      <ListItemText
        primary={
          <TextField
            fullWidth
            label={`Krok ${index + 1}`}
            value={value}
            onChange={(e) => onChangeValue(e.target.value)}
            slotProps={{ inputLabel: { shrink: true } }}
          />
        }
      />
    </ListItem>
  );
}
