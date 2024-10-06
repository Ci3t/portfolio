export function DotBackground({ children }: any) {
  return (
    <div className="h-[50rem] w-full dark:bg-black bg-white  dark:bg-dot-white bg-dot-black/[0.2] relative flex items-center justify-center">
      {/* Radial gradient for the container to give a faded look */}
      <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
      <p className="">{children}</p>
    </div>
  );
}
