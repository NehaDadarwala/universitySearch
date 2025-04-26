import { University } from "../utils/University";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Star, ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";
import { useState } from "react";

interface UniversitiesTableProps {
  universities: University[];
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  onFavoriteToggle?: (id: number) => void;
}

const UniversitiesTable = ({
  universities,
  currentPage,
  totalPages,
  onPageChange,
  onFavoriteToggle,
}: UniversitiesTableProps) => {
  const [isUpdating, setIsUpdating] = useState<number | null>(null);

  const toggleFavorite = async (id: number) => {
    try {
      setIsUpdating(id);
      const response = await fetch(`/api/universities/${id}/favorite`, {
        method: 'PATCH',
      });

      if (!response.ok) {
        throw new Error('Failed to update favorite status');
      }

      // Call the parent component's handler if provided
      onFavoriteToggle?.(id);
    } catch (error) {
      console.error('Error toggling favorite:', error);
    } finally {
      setIsUpdating(null);
    }
  };

  return (
    <div className="space-y-4">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead> Name </TableHead>
            <TableHead> Province/State</TableHead>
            <TableHead> Website </TableHead>
            <TableHead> Favorite </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {universities.map((university) => (
            <TableRow key={university.id}>
              <TableCell>{university.name}</TableCell>
              <TableCell>{university.stateProvince}</TableCell>
              <TableCell>
                {university.webPages.map((url, index) => (
                  <a
                    key={index}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 hover:text-blue-800 hover:underline"
                  >
                    {url}
                    <ExternalLink className="w-4 h-4" />
                  </a>
                ))}
              </TableCell>
              <TableCell>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => toggleFavorite(university.id)}
                  className="rounded-full p-2 hover:bg-yellow-100"
                  aria-label="Star"
                  disabled={isUpdating === university.id}
                >
                  <Star
                    className={`w-5 h-5 ${university.favorite ? 'text-yellow-500 fill-current' : 'text-gray-400'}`}
                  />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div className="flex items-center justify-center gap-4">
        <Button
          variant="outline"
          size="icon"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage <= 1}
          aria-label="Previous page"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <span className="text-sm">
          Page {currentPage} of {totalPages}
        </span>
        <Button
          variant="outline"
          size="icon"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage >= totalPages}
          aria-label="Next page"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default UniversitiesTable;
