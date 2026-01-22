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

/* ----------------------- Skeleton Card ----------------------- */
const PackageSkeleton = () => (
  <div className="bg-white rounded-2xl shadow-sm p-4 space-y-4 animate-pulse">
    <div className="flex flex-col md:flex-row gap-4">
      {/* Image */}
      <Skeleton className="w-full md:w-28 h-48 md:h-28 rounded-xl bg-neutral-100" />

      {/* Content */}
      <div className="flex-1 space-y-3">
        <Skeleton className="h-4 w-1/2 bg-stone-200 rounded" />
        <Skeleton className="h-3 w-1/3 bg-stone-200 rounded" />
        <Skeleton className="h-3 w-2/3 bg-stone-200 rounded" />
        <Skeleton className="h-3 w-3/4 bg-stone-200 rounded" />
      </div>
    </div>

    {/* Action bar */}
    <div className="flex justify-between items-center pt-3">
      <div className="flex items-center gap-3">
        <Skeleton className="h-4 w-4 bg-stone-200 rounded" />
        <Skeleton className="h-4 w-4 bg-stone-200 rounded" />
      </div>

      <div className="flex gap-3">
        {[...Array(4)].map((_, i) => (
          <Skeleton key={i} className="h-5 w-5 bg-stone-200 rounded" />
        ))}
      </div>
    </div>
  </div>
);

/* ----------------------- Status Chip ----------------------- */
const StatusChip = ({ pkg }: { pkg: any }) => {
  if (pkg.archived)
    return (
      <span className="px-2 py-1 text-xs rounded-full bg-yellow-100 text-yellow-700">
        Archived
      </span>
    );

  if (!pkg.isActive)
    return (
      <span className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-600">
        Hidden
      </span>
    );

  return (
    <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-700">
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
      className="bg-white rounded-2xl shadow-sm hover:shadow-md transition"
    >
      {/* Content */}
      <div className="flex flex-col md:flex-row gap-4 p-4">
        <img
          src={pkg.coverImage}
          alt={pkg.name}
          className="w-full md:w-28 h-48 md:h-28 object-cover rounded-xl"
        />

        <div className="flex-1 space-y-2">
          <div className="flex justify-between items-start gap-2">
            <div>
              <h3 className="font-semibold">{pkg.name}</h3>
              <p className="text-sm text-neutral-500">
                ${pkg.price} • {pkg.duration}
              </p>
            </div>

            <StatusChip pkg={pkg} />
          </div>

          <div className="flex flex-wrap gap-4 text-xs text-neutral-500">
            <span className="flex items-center gap-1">
              <BarChart size={14} />
              {pkg.bookingsCount ?? 0} bookings
            </span>
            <span className="capitalize">{pkg.type}</span>
          </div>

          {pkg.description && (
            <p className="text-sm text-neutral-600 line-clamp-2">
              {pkg.description}
            </p>
          )}
        </div>
      </div>

      {/* Actions */}
      <div className="flex justify-between items-center px-4 py-3 border-t border-neutral-100">
        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            checked={selected}
            onChange={() => toggleSelect(pkg._id)}
            className="accent-black"
          />

          {/* Drag handle hidden on mobile */}
          <button
            {...attributes}
            {...listeners}
            className="hidden md:inline-flex text-neutral-400 cursor-grab"
          >
            <GripVertical size={18} />
          </button>
        </div>

        <div className="flex gap-4">
          <button onClick={() => onEdit(pkg)}>
            <Pencil size={18} />
          </button>
          <button onClick={() => onToggleVisibility(pkg._id)}>
            {pkg.isActive ? <Eye size={18} /> : <EyeOff size={18} />}
          </button>
          <button onClick={() => onArchive(pkg._id)}>
            <Archive size={18} />
          </button>
          <button onClick={() => onDelete(pkg._id)}>
            <Trash size={18} className="text-red-500" />
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

  /* ---------------- Bulk actions ---------------- */
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

  /* ---------------- Drag end ---------------- */
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
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Manage Packages</h1>
        <button
          onClick={() => {
            setEditing(null);
            setOpen(true);
          }}
          className="bg-black text-white px-4 py-2 rounded-xl"
        >
          + New Package
        </button>
      </div>

      {/* Bulk toolbar */}
      {selected.length > 0 && (
        <div className="bg-neutral-900 text-white rounded-xl p-4 flex justify-between items-center">
          <span className="text-sm">
            <CheckSquare size={16} className="inline mr-2" />
            {selected.length} selected
          </span>
          <button
            onClick={bulkDelete}
            className="bg-red-500 px-3 py-1 rounded-lg text-sm"
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

      {/* Cards */}
      {/* Cards */}
      {loading ? (
        <div className="grid gap-6">
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
            <div className="grid gap-6">
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
