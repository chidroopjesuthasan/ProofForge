function Badge({ children, tone = "maroon" }) {
  const tones = {
    maroon: "border-[#d9b1ab] bg-[#fff0ed] text-[#7f1d1d]",
    cream: "border-[#ead8a6] bg-[#fff8dc] text-[#6f5618]",
    green: "border-[#b9d9bd] bg-[#effaf0] text-[#256333]",
    blue: "border-[#b8d4ea] bg-[#eef7ff] text-[#275c83]",
    slate: "border-[#ddd6d0] bg-[#f8f5f2] text-[#5f514b]",
    red: "border-[#efb4b4] bg-[#fff0f0] text-[#991b1b]",
  };

  return (
    <span className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-medium ${tones[tone]}`}>
      {children}
    </span>
  );
}

export default Badge;