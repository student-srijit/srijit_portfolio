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
      <DialogContent className="w-[90%] max-w-[500px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl break-words">
            {project.title}
          </DialogTitle>
          <DialogDescription className="text-sm break-words">
            {project.longDescription || project.description}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="flex flex-wrap gap-2">
            {project.tags &&
              project.tags.map((tag: string) => (
                <Badge key={tag} variant="secondary" className="text-xs">
                  {tag}
                </Badge>
              ))}
          </div>
          {project.imageUrl && (
            <div className="w-full overflow-hidden rounded-md">
              <img
                src={project.imageUrl || "/placeholder.svg"}
                alt={project.title}
                className="w-full h-auto object-cover aspect-video"
              />
            </div>
          )}
        </div>
        <DialogFooter className="flex flex-col sm:flex-row gap-2 mt-2">
          {project.liveUrl && (
            <SuperButton
              variant="gradient"
              size="sm"
              asChild
              className="w-full sm:w-auto"
            >
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2"
              >
                Live Demo <ExternalLink className="h-4 w-4" />
              </a>
            </SuperButton>
          )}
          {project.githubUrl && (
            <SuperButton
              variant="outline"
              size="sm"
              asChild
              className="w-full sm:w-auto"
            >
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2"
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
