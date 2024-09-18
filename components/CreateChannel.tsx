"use client";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Plus } from "lucide-react";
import { useState } from "react";

export default function CreateChannel({
  onCreateChannel,
}: {
  onCreateChannel: (channelName: string, users: string[]) => void;
}) {
  const [channelName, setChannelName] = useState("");
  const [users, setUsers] = useState(""); // To hold a comma-separated list of users

  const handleSubmit = () => {
    // Split users input, remove any empty values (if the field is left blank)
    const usersArray = users
      .split(" ")
      .map((user) => user.trim())
      .filter((user) => user); // Filters out empty users

    // Call the passed onCreateChannel function with the channelName and usersArray
    onCreateChannel(channelName, usersArray);
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="font-bold text-center p-4 rounded-md flex flex-col items-center gap-2 cursor-pointer hover:text-gray-300">
          {/* <MessageSquare /> */}
          <Plus />
          <p>Add</p>
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-white">
        <DialogHeader>
          <DialogTitle>Add Channel</DialogTitle>
          <DialogDescription>
            Channel link will be copied to your clipboard. You need atleast one
            user to create a channel (space seperated).
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Channel Name
            </Label>
            <Input
              id="name"
              value={channelName}
              onChange={(e) => setChannelName(e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Add users
            </Label>
            <Input
              id="users"
              value={users}
              onChange={(e) => setUsers(e.target.value)}
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <DialogClose>
            <Button type="submit" onClick={handleSubmit}>
              Create
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
