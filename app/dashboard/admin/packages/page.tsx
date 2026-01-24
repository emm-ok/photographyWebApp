"use client";

import React, { useEffect, useState } from "react";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import {
  Archive,
  BarChart,
  Eye,
  EyeOff,
  GripVertical,
  Pencil,
  Trash,
  CheckSquare,
} from "lucide-react";
import { toast } from "sonner";

import CreatePackagePage from "@/components/package/CreatePackagePage";
import { Skeleton } from "@/components/ui/Skeleton";
import {
  archivePackage,
  deletePackage,
  getAdminPackages,
  togglePackageVisibility,
} from "@/lib/package";
import Image from "next/image";

/* ----------------------- Skeleton Card ----------------------- */
const PackageSkeleton = () => (
  <div className="bg-white rounded-xl shadow-sm p-3 space-y-3 animate-pulse">
    <div className="flex flex-col sm:flex-row gap-3">
      <Skeleton className="w-full sm:w-24 h-32 sm:h-24 rounded-lg bg-neutral-200" />

      <div className="flex-1 space-y-2">
        <Skeleton className="h-3 w-1/2 rounded bg-neutral-200" />
        <Skeleton className="h-2.5 w-1/3 rounded bg-neutral-200" />
        <Skeleton className="h-2.5 w-2/3 rounded bg-neutral-200" />
      </div>
    </div>

    <div className="flex justify-between items-center pt-2">
      <Skeleton className="h-3 w-10 rounded bg-neutral-200" />
      <div className="flex gap-2">
        {[...Array(4)].map((_, i) => (
          <Skeleton
            key={i}
            className="h-4 w-4 rounded bg-neutral-200"
          />
        ))}
      </div>
    </div>
  </div>
);

/* ----------------------- Status Chip ----------------------- */
const StatusChip = ({ pkg }: { pkg: any }) => {
  if (pkg.archived)
    return (
      <span className="px-2 py-0.5 text-[10px] rounded-full bg-yellow-100/40 text-yellow-700">
        Archived
      </span>
    );

  if (!pkg.isActive)
    return (
      <span className="px-2 py-0.5 text-[10px] rounded-full bg-neutral-200 text-neutral-600">
        Hidden
      </span>
    );

  return (
    <span className="px-2 py-0.5 text-[10px] rounded-full bg-green-100/40 text-green-700">
      Active
    </span>
  );
};

/* ----------------------- Sortable Card ----------------------- */
const SortablePackageCard = ({
  pkg,
  selected,
  toggleSelect,
  onEdit,
  onDelete,
  onArchive,
  onToggleVisibility,
}: any) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: pkg._id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="bg-background rounded-xl shadow-sm hover:shadow-md transition"
    >
      {/* Content */}
      <div className="flex flex-col sm:flex-row gap-3 p-3">
        <Image
          src={pkg.coverImage}
          alt={pkg.name}
          width={400}
          height={400}
          className="w-full sm:w-24 h-32 sm:h-24 object-cover rounded-lg"
        />

        <div className="flex-1 space-y-1.5">
          <div className="flex justify-between items-start gap-2">
            <div>
              <h3 className="font-medium text-sm text-foreground">
                {pkg.name}
              </h3>
              <p className="text-[11px] text-foreground">
                ${pkg.price} • {pkg.duration}
              </p>
            </div>

            <StatusChip pkg={pkg} />
          </div>

          <div className="flex flex-wrap gap-3 text-[11px] text-foreground">
            <span className="flex items-center gap-1">
              <BarChart size={12} />
              {pkg.bookingsCount ?? 0}
            </span>
            <span className="capitalize">{pkg.type}</span>
          </div>

          {pkg.description && (
            <p className="text-[11px] text-foreground line-clamp-2">
              {pkg.description}
            </p>
          )}
        </div>
      </div>

      {/* Actions */}
      <div className="flex justify-between items-center px-3 py-2 border-t border-neutral-200">
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={selected}
            onChange={() => toggleSelect(pkg._id)}
            className="accent-black-75"
          />

          <button
            {...attributes}
            {...listeners}
            className="hidden sm:inline-flex text-neutral-400 cursor-grab"
          >
            <GripVertical size={16} />
          </button>
        </div>

        <div className="flex gap-3">
          <button onClick={() => onEdit(pkg)}>
            <Pencil size={15} />
          </button>
          <button onClick={() => onToggleVisibility(pkg._id)}>
            {pkg.isActive ? <Eye size={15} /> : <EyeOff size={15} />}
          </button>
          <button onClick={() => onArchive(pkg._id)}>
            <Archive size={15} />
          </button>
          <button onClick={() => onDelete(pkg._id)}>
            <Trash size={15} className="text-red-500" />
          </button>
        </div>
      </div>
    </div>
  );
};

/* ----------------------- Main Page ----------------------- */
export default function CreatePage() {
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<any>(null);
  const [packages, setPackages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<string[]>([]);

  const sensors = useSensors(useSensor(PointerSensor));

  const fetchPackages = async () => {
    setLoading(true);
    const data = await getAdminPackages();
    setPackages(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchPackages();
  }, []);

  const toggleSelect = (id: string) =>
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );

  const clearSelection = () => setSelected([]);

  const bulkDelete = async () => {
    await Promise.all(selected.map(deletePackage));
    toast.success("Packages deleted");
    clearSelection();
    fetchPackages();
  };

  const onDragEnd = (event: any) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    setPackages((items) => {
      const oldIndex = items.findIndex((i) => i._id === active.id);
      const newIndex = items.findIndex((i) => i._id === over.id);
      return arrayMove(items, oldIndex, newIndex);
    });
  };

  const toggleVisibility = async (id: string) => {
    await togglePackageVisibility(id);
    toast.success("Package visibility updated");
    fetchPackages();
  };

  const archivePkg = async (id: string) => {
    await archivePackage(id);
    toast.success("Package archived");
    fetchPackages();
  };

  const deletePkg = async (id: string) => {
    await deletePackage(id);
    toast.success("Package deleted");
    fetchPackages();
  };

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-lg sm:text-xl font-semibold text-foreground">
          Manage Packages
        </h1>
        <button
          onClick={() => {
            setEditing(null);
            setOpen(true);
          }}
          className="bg-background text-foreground px-3 py-1.5 rounded-lg text-xs"
        >
          + New
        </button>
      </div>

      {/* Bulk toolbar */}
      {selected.length > 0 && (
        <div className="bg-neutral-900 text-white rounded-lg p-3 flex justify-between items-center">
          <span className="text-xs">
            <CheckSquare size={14} className="inline mr-1" />
            {selected.length} selected
          </span>
          <button
            onClick={bulkDelete}
            className="bg-red-500 px-2 py-1 rounded-md text-xs"
          >
            Delete
          </button>
        </div>
      )}

      <CreatePackagePage
        open={open}
        onClose={() => setOpen(false)}
        initialData={editing}
        onSuccess={fetchPackages}
      />

      {loading ? (
        <div className="grid gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <PackageSkeleton key={i} />
          ))}
        </div>
      ) : (
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={onDragEnd}
        >
          <SortableContext
            items={packages.map((p) => p._id)}
            strategy={verticalListSortingStrategy}
          >
            <div className="grid gap-4">
              {packages.map((pkg) => (
                <SortablePackageCard
                  key={pkg._id}
                  pkg={pkg}
                  selected={selected.includes(pkg._id)}
                  toggleSelect={toggleSelect}
                  onEdit={(p: any) => {
                    setEditing(p);
                    setOpen(true);
                  }}
                  onDelete={() => deletePkg(pkg._id)}
                  onArchive={() => archivePkg(pkg._id)}
                  onToggleVisibility={() => toggleVisibility(pkg._id)}
                />
              ))}
            </div>
          </SortableContext>
        </DndContext>
      )}
    </div>
  );
}
