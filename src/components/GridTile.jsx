import { twMerge } from "tailwind-merge";

function ReviewCard({ img, name, username, body }) {
  return (
    <figure
      style={{

        backgroundColor: '#18181b',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
      className={twMerge(
        "relative h-54 w-64 cursor-pointer overflow-hidden rounded-xl border p-4 text-left",
        // background overlay to darken image
        "bg-black/50 bg-blend-darken",
        // light mode fallback styles
        "border-gray-950/[.1] hover:bg-gray-950/[.05]",
        // dark mode styles
        "dark:border-gray-50/[.1] dark:hover:bg-gray-50/[.15]"
      )}
    >
      <figcaption className="text-3xl font-semibold text-white drop-shadow-md text-center">
        {name}
      </figcaption>
      <blockquote className="mt-2 p-2 text-xl text-zinc-300 drop-shadow-sm text-center">{body}</blockquote>
    </figure>
  );
}

export default ReviewCard;
