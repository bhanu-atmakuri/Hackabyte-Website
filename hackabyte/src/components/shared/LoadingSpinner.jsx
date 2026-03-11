export default function LoadingSpinner({ size = "default" }) {
  const sizeClass = {
    small: "w-5 h-5",
    default: "w-8 h-8",
    large: "w-12 h-12"
  }[size];

  return (
    <div className="flex justify-center">
      <div
        className={`animate-spin rounded-full ${sizeClass}`}
        style={{
          background: 'conic-gradient(from 0deg, transparent, #F93236, #FF2247)',
          mask: 'radial-gradient(farthest-side, transparent calc(100% - 2px), #000 calc(100% - 2px))',
          WebkitMask: 'radial-gradient(farthest-side, transparent calc(100% - 2px), #000 calc(100% - 2px))'
        }}
      ></div>
    </div>
  );
}
