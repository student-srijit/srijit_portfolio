"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { SuperButton } from "@/components/ui/super-button";

interface SkillsDialogProps {
  isOpen: boolean;
  onClose: () => void;
  category: string;
  skills: { name: string }[];
  color: string;
}

export default function SkillsDialog({
  isOpen,
  onClose,
  category,
  skills,
  color,
}: SkillsDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{category} Skills</DialogTitle>
        </DialogHeader>
        <div className="mt-4">
          <ul className="list-disc list-inside space-y-2">
            {skills.map((skill) => (
              <li key={skill.name} className="text-sm font-medium">
                {skill.name}
              </li>
            ))}
          </ul>
        </div>
        <DialogFooter>
          <SuperButton onClick={onClose}>Close</SuperButton>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
