type SidebarBrandProps = {
  productName: string;
};

export function SidebarBrand({ productName }: SidebarBrandProps) {
  return (
    <div className="flex items-center gap-3">
      <div className="grid size-8 grid-cols-2 gap-1 [transform:skewY(-16deg)]">
        <span className="rounded-[3px_7px_3px_7px] bg-indigo-500" />
        <span className="rounded-[3px_7px_3px_7px] bg-fuchsia-500" />
        <span className="rounded-[3px_7px_3px_7px] bg-purple-500" />
        <span className="rounded-[3px_7px_3px_7px] bg-amber-400" />
      </div>
      <span className="text-[22px] font-bold tracking-tight text-content">
        {productName}
      </span>
    </div>
  );
}
