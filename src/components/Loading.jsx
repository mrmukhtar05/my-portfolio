const Loading = () => {
  return (
    <div className="fixed inset-0 z-[9999] bg-white flex items-center justify-center">
      <div className="flex flex-col items-center">
        <div
          className="
            w-10
            h-10
            rounded-full
            border-4
            border-emerald-100
            border-t-emerald-600
            animate-spin
          "
        />

        <p className="mt-4 text-sm font-medium text-slate-500">
          Loading portfolio...
        </p>
      </div>
    </div>
  );
};

export default Loading;