import type { Platform, PostStatus } from "@/types/post";

type PlatformConfig = {
  label: string;
  characterLimit: number;
  color: string;
  surfaceColor: string;
};

type StatusConfig = {
  label: string;
  color: string;
};

export const PLATFORM_CONFIG = {
  facebook: {
    label: "Facebook",
    characterLimit: 5000,
    color: "text-blue-600",
    surfaceColor: "bg-blue-50",
  },
  instagram: {
    label: "Instagram",
    characterLimit: 2200,
    color: "text-pink-600",
    surfaceColor: "bg-pink-50",
  },
  x: {
    label: "X",
    characterLimit: 280,
    color: "text-slate-900",
    surfaceColor: "bg-slate-100",
  },
  tiktok: {
    label: "TikTok",
    characterLimit: 2200,
    color: "text-slate-900",
    surfaceColor: "bg-cyan-50",
  },
} satisfies Record<Platform, PlatformConfig>;

export const PLATFORMS = Object.keys(PLATFORM_CONFIG) as Platform[];

export const STATUS_CONFIG = {
  scheduled: { label: "Scheduled", color: "text-brand" },
  published: { label: "Published", color: "text-emerald-600" },
  failed: { label: "Failed", color: "text-rose-600" },
} satisfies Record<PostStatus, StatusConfig>;

export const POST_STATUSES = Object.keys(STATUS_CONFIG) as PostStatus[];
