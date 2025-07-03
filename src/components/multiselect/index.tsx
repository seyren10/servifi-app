"use client";

import * as React from "react";
import { Check, ChevronsUpDown, X } from "lucide-react";

import { twMerge as cn } from "tailwind-merge";
import { Button } from "../button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../command";
import { Popover, PopoverContent, PopoverTrigger } from "../popover";
import { Badge } from "../badge";

export interface MultiSelectOption<T = string> {
  label: string;
  value: T;
  disabled?: boolean;
}

interface MultiSelectProps<T> {
  options: MultiSelectOption<T>[];
  selected: T[];
  onSelectionChange: (selected: T[]) => void;
  placeholder?: string;
  searchPlaceholder?: string;
  emptyMessage?: string;
  maxSelected?: number;
  disabled?: boolean;
  className?: string;
  id?: string;
  "aria-labelledby"?: string;
  "aria-describedby"?: string;
  "aria-invalid"?: boolean;
  ref: React.Ref<HTMLButtonElement>;
}

export function MultiSelect<T = string>({
  options,
  selected,
  onSelectionChange,
  placeholder = "Select items...",
  searchPlaceholder = "Search items...",
  emptyMessage = "No items found.",
  maxSelected,
  disabled = false,
  className,
  id,
  "aria-labelledby": ariaLabelledby,
  "aria-describedby": ariaDescribedby,
  "aria-invalid": ariaInvalid,
}: MultiSelectProps<T>) {
  const [open, setOpen] = React.useState(false);
  const [searchValue, setSearchValue] = React.useState("");

  const selectedOptions = options.filter((option) =>
    selected.includes(option.value),
  );

  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().includes(searchValue.toLowerCase()),
  );

  const handleSelect = (option: MultiSelectOption<T>) => {
    if (option.disabled) return;

    const isSelected = selected.includes(option.value);

    if (isSelected) {
      onSelectionChange(selected.filter((item) => item !== option.value));
    } else {
      if (maxSelected && selected.length >= maxSelected) return;
      onSelectionChange([...selected, option.value]);
    }
  };

  const handleRemove = (value: T) => {
    onSelectionChange(selected.filter((item) => item !== value));
  };

  const handleClear = () => {
    onSelectionChange([]);
  };

  return (
    <div className={cn("w-full", className)}>
      {/* Hidden input for form submission */}

      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            aria-labelledby={ariaLabelledby}
            aria-describedby={ariaDescribedby}
            id={id}
            className="aria-invalid:ring-destructive/20 aria-invalid:border-destructive h-auto min-h-10 w-full justify-between rounded-xl"
            disabled={disabled}
            aria-invalid={ariaInvalid}
          >
            <div className="flex flex-1 flex-wrap gap-1">
              {selectedOptions.length === 0 ? (
                <span className="text-muted-foreground">{placeholder}</span>
              ) : (
                selectedOptions.map((option) => (
                  <Badge
                    key={String(option.value)}
                    variant="secondary"
                    className="text-xs"
                  >
                    {option.label}
                    <span
                      className="ring-offset-background focus:ring-ring ml-1 cursor-pointer rounded-full outline-none focus:ring-2 focus:ring-offset-2"
                      role="button"
                      tabIndex={0}
                      aria-label={`Remove ${option.label}`}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          e.stopPropagation();
                          handleRemove(option.value);
                        }
                      }}
                      onMouseDown={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                      }}
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        handleRemove(option.value);
                      }}
                    >
                      <X className="text-muted-foreground hover:text-foreground h-3 w-3" />
                    </span>
                  </Badge>
                ))
              )}
            </div>
            <div className="flex items-center gap-2">
              {selectedOptions.length > 0 && (
                <span
                  role="button"
                  tabIndex={0}
                  aria-label="Clear all selections"
                  className="text-muted-foreground hover:text-foreground ring-offset-background focus:ring-ring cursor-pointer rounded-full outline-none focus:ring-2 focus:ring-offset-2"
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      e.stopPropagation();
                      handleClear();
                    }
                  }}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleClear();
                  }}
                >
                  <X className="h-4 w-4" />
                </span>
              )}
              <ChevronsUpDown className="h-4 w-4 shrink-0 opacity-50" />
            </div>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0" align="start">
          <Command>
            <CommandInput
              placeholder={searchPlaceholder}
              value={searchValue}
              onValueChange={setSearchValue}
            />
            <CommandList>
              <CommandEmpty>{emptyMessage}</CommandEmpty>
              <CommandGroup>
                {filteredOptions.map((option) => {
                  const isSelected = selected.includes(option.value);
                  const isDisabled =
                    option.disabled ||
                    (maxSelected &&
                      !isSelected &&
                      selected.length >= maxSelected);

                  return (
                    <CommandItem
                      key={String(option.value)}
                      value={option.label}
                      onSelect={() => handleSelect(option)}
                      disabled={!!isDisabled}
                      className="cursor-pointer text-muted-foreground"
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          isSelected ? "opacity-100" : "opacity-0",
                        )}
                      />
                      <span
                        className={cn(isDisabled && "text-muted-foreground")}
                      >
                        {option.label}
                      </span>
                    </CommandItem>
                  );
                })}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>

      {maxSelected && (
        <p className="text-muted-foreground mt-1 text-xs">
          {selected.length}/{maxSelected} selected
        </p>
      )}
    </div>
  );
}
