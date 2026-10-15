"use client";

import { useState, type FormEvent } from "react";
import { CalendarDays, ImageIcon, Send } from "lucide-react";
import { PlatformIcon } from "@/components/shared/platform-icon";
import { PLATFORM_CONFIG, PLATFORMS } from "@/lib/constants";
import { getDefaultScheduleTime } from "@/lib/date";
import type { Platform, Post } from "@/types/post";

type PostComposerProps = {
  onSchedule: (post: Post) => void;
  onCancel: () => void;
};

function isValidImageUrl(value: string): boolean {
  try {
    const url = new URL(value);

    return url.protocol === "https:" || url.protocol === "http:";
  } catch {
    return false;
  }
}

export function PostComposer({ onSchedule, onCancel }: PostComposerProps) {
  const [content, setContent] = useState("");
  const [platforms, setPlatforms] = useState<Platform[]>([]);
  const [mediaUrl, setMediaUrl] = useState("");
  const [scheduledAt, setScheduledAt] = useState(getDefaultScheduleTime);
  const [errorMessage, setErrorMessage] = useState("");

  const selectedPlatforms = platforms.map((platform) => ({
    platform,
    ...PLATFORM_CONFIG[platform],
  }));
  const hasExceededCharacterLimit = selectedPlatforms.some(
    ({ characterLimit }) => content.length > characterLimit,
  );

  function togglePlatform(platform: Platform) {
    setPlatforms((currentPlatforms) =>
      currentPlatforms.includes(platform)
        ? currentPlatforms.filter((currentPlatform) => currentPlatform !== platform)
        : [...currentPlatforms, platform],
    );
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const trimmedContent = content.trim();
    const trimmedMediaUrl = mediaUrl.trim();
    const scheduleDate = new Date(scheduledAt);

    if (!trimmedContent) {
      setErrorMessage("Write post content before scheduling.");
      return;
    }

    if (platforms.length === 0) {
      setErrorMessage("Select at least one platform.");
      return;
    }

    if (hasExceededCharacterLimit) {
      setErrorMessage("Shorten the content to meet every selected platform limit.");
      return;
    }

    if (Number.isNaN(scheduleDate.getTime()) || scheduleDate <= new Date()) {
      setErrorMessage("Choose a future date and time.");
      return;
    }

    if (trimmedMediaUrl && !isValidImageUrl(trimmedMediaUrl)) {
      setErrorMessage("Enter a valid image URL starting with http or https.");
      return;
    }

    onSchedule({
      id: crypto.randomUUID(),
      content: trimmedContent,
      platforms,
      mediaUrl: trimmedMediaUrl || undefined,
      scheduledAt: scheduleDate.toISOString(),
      status: "scheduled",
    });
  }

  return (
    <form onSubmit={handleSubmit} className="p-5 sm:p-6">
      <div className="space-y-5">
        <label className="block">
          <span className="text-sm font-semibold text-content">Post content</span>
          <textarea
            value={content}
            onChange={(event) => setContent(event.target.value)}
            rows={6}
            placeholder="What would you like to share?"
            className="mt-2 w-full resize-y rounded-xl border border-line bg-surface px-3 py-2.5 text-sm leading-6 text-content outline-none placeholder:text-content-muted focus:border-brand"
          />
        </label>

        <fieldset>
          <legend className="text-sm font-semibold text-content">Publish to</legend>
          <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-4">
            {PLATFORMS.map((platform) => {
              const config = PLATFORM_CONFIG[platform];
              const isSelected = platforms.includes(platform);

              return (
                <button
                  key={platform}
                  type="button"
                  aria-pressed={isSelected}
                  onClick={() => togglePlatform(platform)}
                  className={`flex h-11 items-center justify-center gap-2 rounded-xl border px-3 text-sm font-semibold transition-colors ${
                    isSelected
                      ? "border-brand bg-indigo-50 text-brand"
                      : "border-line text-content-muted hover:border-brand hover:text-content"
                  }`}
                >
                  <PlatformIcon platform={platform} className="size-4" />
                  {config.label}
                </button>
              );
            })}
          </div>
        </fieldset>

        {selectedPlatforms.length > 0 ? (
          <div className="space-y-2 rounded-xl bg-surface-muted p-3">
            {selectedPlatforms.map(({ platform, label, characterLimit }) => {
              const isOverLimit = content.length > characterLimit;

              return (
                <div
                  key={platform}
                  className="flex items-center justify-between gap-3 text-xs"
                >
                  <span className="text-content-muted">{label}</span>
                  <span
                    className={
                      isOverLimit
                        ? "font-semibold text-rose-600"
                        : "text-content-muted"
                    }
                  >
                    {content.length.toLocaleString()} / {characterLimit.toLocaleString()}
                  </span>
                </div>
              );
            })}
          </div>
        ) : null}

        <label className="block">
          <span className="text-sm font-semibold text-content">Image URL</span>
          <span className="mt-1 block text-xs text-content-muted">Optional</span>
          <div className="relative mt-2">
            <ImageIcon className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-content-muted" />
            <input
              type="url"
              value={mediaUrl}
              onChange={(event) => setMediaUrl(event.target.value)}
              placeholder="https://example.com/image.jpg"
              className="h-11 w-full rounded-xl border border-line bg-surface px-9 text-sm text-content outline-none placeholder:text-content-muted focus:border-brand"
            />
          </div>
        </label>

        <label className="block">
          <span className="text-sm font-semibold text-content">
            Publish date and time
          </span>
          <div className="relative mt-2">
            <CalendarDays className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-content-muted" />
            <input
              type="datetime-local"
              value={scheduledAt}
              min={getDefaultScheduleTime()}
              onChange={(event) => setScheduledAt(event.target.value)}
              className="h-11 w-full rounded-xl border border-line bg-surface px-9 text-sm text-content outline-none focus:border-brand"
            />
          </div>
          <p className="mt-2 text-xs text-content-muted">
            Your local time is converted to UTC when scheduled.
          </p>
        </label>
      </div>

      {errorMessage ? (
        <p role="alert" className="mt-5 rounded-xl bg-rose-50 px-3 py-2.5 text-sm text-rose-600">
          {errorMessage}
        </p>
      ) : null}

      <div className="mt-6 grid grid-cols-2 gap-3">
        <button
          type="button"
          onClick={onCancel}
          className="inline-flex h-11 items-center justify-center rounded-xl border border-line px-4 text-sm font-semibold text-content transition-colors hover:bg-surface-muted"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={hasExceededCharacterLimit}
          className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-brand px-4 text-sm font-semibold text-white transition-colors hover:bg-brand-hover disabled:cursor-not-allowed disabled:opacity-50"
        >
          <Send className="size-4" />
          Schedule post
        </button>
      </div>
    </form>
  );
}
