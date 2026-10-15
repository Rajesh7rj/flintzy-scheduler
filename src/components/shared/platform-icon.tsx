import type { IconType } from "react-icons";
import {
  FaFacebookF,
  FaInstagram,
  FaTiktok,
  FaXTwitter,
} from "react-icons/fa6";
import { PLATFORM_CONFIG } from "@/lib/constants";
import type { Platform } from "@/types/post";

type PlatformIconProps = {
  platform: Platform;
  className?: string;
};

const platformIcons: Record<Platform, IconType> = {
  facebook: FaFacebookF,
  instagram: FaInstagram,
  x: FaXTwitter,
  tiktok: FaTiktok,
};

export function PlatformIcon({ platform, className }: PlatformIconProps) {
  const Icon = platformIcons[platform];
  const { label } = PLATFORM_CONFIG[platform];

  return <Icon aria-label={label} className={className} />;
}
