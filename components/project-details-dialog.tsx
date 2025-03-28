"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { SuperButton } from "@/components/ui/super-button";
import { ExternalLink, Github } from "lucide-react";

interface ProjectDetailsDialogProps {
  project: any; // Replace 'any' with a more specific type if possible
  isOpen: boolean;
  onClose: () => void;
}

export default function ProjectDetailsDialog({
  project,
  isOpen,
  onClose,
}: ProjectDetailsDialogProps) {
  if (!project) {
    return null;
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{project.title}</DialogTitle>
          <DialogDescription>
            {project.longDescription || project.description}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="flex flex-wrap gap-2">
            {project.tags &&
              project.tags.map((tag: string) => (
                <Badge key={tag} variant="secondary">
                  {tag}
                </Badge>
              ))}
          </div>
          {project.imageUrl && (
            <img
              src={project.imageUrl || "/placeholder.svg"}
              alt={project.title}
              className="rounded-md aspect-video object-cover"
            />
          )}
        </div>
        <DialogFooter>
          {project.liveUrl && (
            <SuperButton variant="gradient" size="sm" asChild>
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                Live Demo <ExternalLink className="h-4 w-4" />
              </a>
            </SuperButton>
          )}
          {project.githubUrl && (
            <SuperButton variant="outline" size="sm" asChild>
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                View Code <Github className="h-4 w-4" />
              </a>
            </SuperButton>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
