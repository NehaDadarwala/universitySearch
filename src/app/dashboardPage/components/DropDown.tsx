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
          <SelectValue placeholder="Select an University" />
        </SelectTrigger>
        <SelectContent className="z-50 bg-white dark:bg-gray-800">
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
