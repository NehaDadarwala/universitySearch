import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

const DropDown = ({
  items,
  onSelect,
  selectedItem,
}: {
  items: string[];
  onSelect: (value: string) => void;
  selectedItem: string;
}) => {
  return (
    <>
      <Select value={selectedItem} onValueChange={onSelect}>
        <SelectTrigger>
          <SelectValue placeholder="Select a Country" />
        </SelectTrigger>
        <SelectContent className="z-50 bg-white dark:bg-gray-800 max-h-[300px] overflow-y-auto">
          <SelectItem value="none">Clear</SelectItem>
          {items.map((item: string) => (
            <SelectItem key={item} value={String(item)}>
              {item}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </>
  );
};

export default DropDown;
