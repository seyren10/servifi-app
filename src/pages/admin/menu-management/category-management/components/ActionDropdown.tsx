import type { Category } from "../../../../../features/category/type";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../../../../components/dropdown-menu";
import { Button } from "../../../../../components/button";
import { LoaderCircle, MoreHorizontal, Pencil, Trash } from "lucide-react";
import { Link, useRevalidator } from "react-router";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../../../../components/dialog";
import { createContext, useContext, useEffect, useState } from "react";
import {
  deleteCategory,
  getCategories,
  getCategoryProductsCount,
  moveProductsToCategory,
} from "../../../../../features/category/api";
import type { AxiosError } from "axios";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../../../components/select";
import { Checkbox } from "../../../../../components/checkbox";
import { Label } from "../../../../../components/label";
import CategoryIcon from "../../../../../components/app/CategoryIcon";

type Props = {
  category: Category;
};

type OpenDialogValue = {
  dialog: boolean;
  setDialog: (open: boolean) => void;
  category: Category;
  revalidate: () => Promise<void>;
};
const OpenDialogContext = createContext<OpenDialogValue>({} as OpenDialogValue);

export default function ActionDropdown({ category }: Props) {
  const [dialog, setDialog] = useState(false);
  const revalidator = useRevalidator();

  const handleRevalidate = () => {
    return Promise.resolve(revalidator.revalidate());
  };

  return (
    <OpenDialogContext.Provider
      value={{ dialog, setDialog, category, revalidate: handleRevalidate }}
    >
      <Dialog open={dialog} onOpenChange={setDialog}>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button size="icon" variant="ghost">
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuGroup>
              <DropdownMenuItem asChild>
                <Link to={`${category._id}/edit`}>
                  <Pencil /> Edit
                </Link>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuLabel>Danger Zone</DropdownMenuLabel>
            <DropdownMenuGroup>
              <DialogTrigger asChild>
                <DropdownMenuItem>
                  <Trash className="stroke-red-500" /> Delete
                </DropdownMenuItem>
              </DialogTrigger>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>

        {dialog && <ConfirmDeleteDialog />}
      </Dialog>
    </OpenDialogContext.Provider>
  );
}

function ConfirmDeleteDialog() {
  const { category } = useContext(OpenDialogContext);
  const [categoryProductsCount, setCategoryProductsCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<AxiosError<{ message: string }> | null>(
    null,
  );

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      try {
        const { _id: categoryId } = category;
        const res = await getCategoryProductsCount(categoryId);
        setCategoryProductsCount(res);
      } catch (e) {
        const err = e as AxiosError<{ message: string }>;
        setError(err);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [category]);

  if (isLoading)
    return (
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Loading</DialogTitle>
          <DialogDescription>
            {isLoading && <LoaderCircle className="mx-auto animate-spin" />}
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    );

  if (error)
    return (
      <DialogContent>
        <DialogHeader>
          <DialogTitle>An error occured</DialogTitle>
          <DialogDescription className="text-error">
            {error.response?.data.message}
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    );

  return categoryProductsCount <= 0 ? (
    <DeleteCategoryDialogContent />
  ) : (
    <MoveCategoryDialogContent count={categoryProductsCount} />
  );
}

function DeleteCategoryDialogContent() {
  const [isLoading, setIsLoading] = useState(false);
  const { category, setDialog, revalidate } = useContext(OpenDialogContext);

  const handleDelete = async () => {
    setIsLoading(true);
    await deleteCategory(category._id);
    setIsLoading(false);
    await revalidate();
    setDialog(false);
  };

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Warning</DialogTitle>
        <DialogDescription>
          Are you sure you want to delete this category?
        </DialogDescription>
      </DialogHeader>
      <DialogFooter>
        <DialogClose asChild>
          <Button disabled={isLoading}>Cancel</Button>
        </DialogClose>
        <Button variant="secondary" onClick={handleDelete} disabled={isLoading}>
          Yes
        </Button>
      </DialogFooter>
    </DialogContent>
  );
}

function MoveCategoryDialogContent({ count }: { count: number }) {
  const [loading, setIsLoading] = useState(false);
  const { category, revalidate, setDialog } = useContext(OpenDialogContext);
  const [categories, setCategories] = useState<Category[] | null>(null);
  const validCategories = categories?.filter((c) => c._id !== category._id);
  const [form, setForm] = useState({
    category: "",
    moveAndDelete: true,
  });
  useEffect(() => {
    const fetchCategories = async () => {
      const res = await getCategories();
      setCategories(res);
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    if (validCategories && validCategories.length > 0) {
      setForm((prev) => ({ ...prev, category: validCategories[0]._id }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categories, category._id]);

  const handleSubmit = async () => {
    setIsLoading(true);
    await moveProductsToCategory({
      from: category._id,
      to: form.category,
    });

    if (form.moveAndDelete) {
      await deleteCategory(category._id);
      await revalidate();
    }
    setIsLoading(false);
    setDialog(false);
  };
  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Warning</DialogTitle>
        <DialogDescription>
          This category has {count} products associated with it. Please select a
          new category to move these products to before deleting this category.
        </DialogDescription>
      </DialogHeader>

      <div className="space-y-4">
        <Select
          value={form.category}
          onValueChange={(v) => setForm((prev) => ({ ...prev, category: v }))}
        >
          <SelectTrigger className="capitalize">
            <SelectValue placeholder="Select new category" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {validCategories?.map((category) => (
                <SelectItem
                  value={category._id}
                  className="capitalize"
                  key={category._id}
                >
                  <CategoryIcon name={category.icon} />
                  {category.name}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        <Label className="hover:bg-accent/50 has-[[aria-checked=true]]:border-primary flex items-start gap-3 rounded-lg border p-3">
          <Checkbox
            id="toggle-2"
            checked={form.moveAndDelete}
            onCheckedChange={(checked) =>
              setForm((prev) => ({
                ...prev,
                moveAndDelete: checked as boolean,
              }))
            }
            className="data-[state=checked]:border-primary data-[state=checked]:bg-primary data-[state=checked]:text-white"
          />
          <div className="grid gap-1.5 font-normal">
            <p className="text-sm leading-none font-medium">Move and Delete</p>
            <p className="text-muted-foreground text-sm">
              Move the products to the selected category and delete this
              category
            </p>
          </div>
        </Label>
        <DialogFooter>
          <DialogClose asChild>
            <Button disabled={loading}>Cancel</Button>
          </DialogClose>
          <Button variant="secondary" onClick={handleSubmit} disabled={loading}>
            Move
          </Button>
        </DialogFooter>
      </div>
    </DialogContent>
  );
}
