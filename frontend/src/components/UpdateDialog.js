import * as DialogPrimitive from "@radix-ui/react-dialog";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";
import axios from "axios";
import { api } from "./lib/axios";

export const UpDateDialog = ({ id, setAccounts, amount, title }) => {
  const [titlex, setTitlex] = useState(title);
  const [amountx, setAmountx] = useState(amount);

  const updateAccount = async () => {
    const response = await api.put(`/accounts/${id}`, {
      id,
      amount: amountx,
      title: titlex,
    });

    console.log(response.data, "JJj");

    setAccounts((prev) => {
      return prev.map((item) => {
        if (item.id === id) return response.data;
        return item;
      });
    });
  };

  useEffect(() => {
    setAmountx(amount);
    setTitlex(title);
  }, [amount, title]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Edit </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit </DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you are done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Title
            </Label>
            <Input
              id="name"
              value={titlex}
              onChange={(e) => setTitlex(e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Amount
            </Label>
            <Input
              id="username"
              onChange={(e) => setAmountx(e.target.value)}
              value={amountx}
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <DialogPrimitive.Close className="rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
            <Button
              onClick={() => {
                updateAccount();
              }}
              type="submit"
            >
              Save changes
            </Button>
          </DialogPrimitive.Close>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
