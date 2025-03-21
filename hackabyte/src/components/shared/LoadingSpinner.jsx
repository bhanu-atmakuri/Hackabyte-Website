export default function LoadingSpinner({ size = "default" }) {
  const sizeClass = {
    small: "w-5 h-5",
    default: "w-8 h-8",
    large: "w-12 h-12"
  }[size];

  return (
    <div className="flex justify-center">
      <div className={`animate-spin rounded-full border-t-2 border-b-2 border-[#FF2247] ${sizeClass}`}></div>
    </div>
  );
}
