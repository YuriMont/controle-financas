export function Spinner() {
  return (
    <div className="relative">
      <div className="absolute right-1/2 bottom-1/2  transform translate-x-1/2 translate-y-1/2 ">
        <div className="border-t-transparent border-solid animate-spin  rounded-full border-gray-400 border-2 h-6 w-6"></div>
      </div>
    </div>
  );
}
