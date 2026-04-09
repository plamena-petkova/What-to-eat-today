type Mode = "my" | "all";

interface Props {
    value: Mode;
    onChange: (mode: Mode) => void;
}

export default function RecipeModeToggle({ value, onChange }: Props) {
    return (
        <div className="flex justify-center mb-6">
            <div className="relative flex w-[320px] h-12 bg-pink-50 rounded-full p-3 border border-pink-500">

                {/* Sliding highlight */}
                <div
                    className={`absolute top-1 bottom-1 left-1 right-1 w-[calc(49%-4px)] rounded-full bg-amber-500 transition-all duration-300 ease-in-out
  ${value === "all" ? "translate-x-[calc(100%+4px)]" : ""}`}
                />

                {/* My Recipes */}
                <button
                    onClick={() => onChange("my")}
                    className={`z-10 w-1/2 flex items-center justify-center gap-2 text-sm font-medium transition-colors
          ${value === "my" ? "text-white" : " text-amber-700"}`}
                >
                    🍳 My Recipes
                </button>

                {/* All Recipes */}
                <button
                    onClick={() => onChange("all")}
                    className={`z-10 w-1/2 flex items-center justify-center gap-2 p-3 text-sm font-medium transition-colors
          ${value === "all" ? "text-white" : " text-amber-700"}`}
                >
                    🌍 All Recipes
                </button>
            </div>
        </div>
    );
}