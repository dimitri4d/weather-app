"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@frontend/lib/utils";
import { Button } from "@frontend/components/ui/button";
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@frontend/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@frontend/components/ui/popover";

interface City {
  id: number;
  name: string;
  country: string;
}

interface ComboboxProps {
  cities: City[];
  selectedCity: number | null;
  setSelectedCity: (id: number) => void;
}

const Combobox: React.FC<ComboboxProps> = ({
  cities,
  selectedCity,
  setSelectedCity,
}) => {
  const [open, setOpen] = React.useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {selectedCity
            ? cities.find((city) => city.id === selectedCity)?.name
            : "Select city..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandList>
            <CommandGroup>
              {cities.map((city) => (
                <CommandItem
                  key={city.id}
                  value={city.id.toString()}
                  onSelect={(currentValue) => {
                    setSelectedCity(Number(currentValue));
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      selectedCity === city.id ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {city.name}, {city.country}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export { Combobox };
