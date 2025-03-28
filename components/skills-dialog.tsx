"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";

interface SkillsDialogProps {
  isOpen: boolean;
  onClose: () => void;
  category: string;
  skills: { name: string; level: number }[];
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
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-xl">{category} Skills</DialogTitle>
        </DialogHeader>
        <div className="mt-4 space-y-4">
          {skills.map((skill) => (
            <div key={skill.name} className="space-y-1">
              <div className="flex justify-between items-center">
                <span className="font-medium">{skill.name}</span>
                <span className="text-sm text-muted-foreground">
                  {skill.level}%
                </span>
              </div>
              <Progress
                value={skill.level}
                className="h-2"
                indicatorClassName={`bg-gradient-to-r ${color}`}
              />
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
