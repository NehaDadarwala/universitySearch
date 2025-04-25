import { Input } from "@/components/ui/input";
import { useDebouncedCallback } from "use-debounce";

const SearchBox = ({ onChange }: { onChange: (value: string) => void }) => {
  const debouncedOnChange = useDebouncedCallback((name: string) => {
    onChange(name);
  }, 500);

  return (
    <>
      <Input
        placeholder="University Name"
        onChange={(e) => debouncedOnChange(e.target.value)}
      />
    </>
  );
};

export default SearchBox;
