import { cn } from "../lib/utils";

export const Button = ({ props, ref }: any) => {
  const { className, ...other } = props;
  return (
    <Button
      ref={ref}
      className={cn(
        "cursor-pointer transition text-sm font-sans font-semibold leading-normal bg-black text-white rounded-lg px-4 py-2 border border-solid  hover:bg-violet-600  active:shadow-none focus-visible:shadow-[0_0_0_4px_#ddd6fe] dark:focus-visible:shadow-[0_0_0_4px_#a78bfa] focus-visible:outline-none disabled:text-slate-700 disabled:dark:text-slate-200 disabled:bg-slate-200 disabled:dark:bg-slate-700 disabled:cursor-not-allowed disabled:shadow-none disabled:dark:shadow-none disabled:hover:bg-slate-200 disabled:hover:dark:bg-slate-700 disabled:border-none",
        className
      )}
      {...other}
    />
  );
};
