"use client";

import Cookies from "js-cookie";
import { useState, useEffect } from "react";
import { memesData as defaultMemes } from "@/app/data/memes";
import { MemeModal } from "@/app/components/Modal";
import {
  Button,
  Table,
  TableBody,
  TableColumn,
  TableHeader,
  TableRow,
  TableCell,
} from "@heroui/react";

const getInitialMemes = () => {
  try {
    const fromCookie = Cookies.get("memes");
    if (fromCookie) return JSON.parse(fromCookie);
  } catch (e) {
    console.error("Invalid cookie format", e);
  }
  Cookies.set("memes", JSON.stringify(defaultMemes));
  return defaultMemes;
};

export default function TablePage() {
  const [memes, setMemes] = useState(getInitialMemes);
  const [editing, setEditing] = useState(null);
  const [isOpenModal, setOpenModal] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const handleUpdate = (updatedMeme) => {
    const updated = memes.map((m) =>
      m.id === updatedMeme.id ? updatedMeme : m,
    );
    setMemes(updated);
    Cookies.set("memes", JSON.stringify(updated));
    setEditing(null);
    setOpenModal(false);
  };

  const onOpenModal = (meme) => {
    setEditing(meme);
    setOpenModal(true);
  };

  const closeModal = () => {
    setEditing(null);
    setOpenModal(false);
  };

  useEffect(() => {
    const fromCookie = Cookies.get("memes");

    if (fromCookie) {
      try {
        setMemes(JSON.parse(fromCookie));
      } catch {
        setMemes(defaultMemes);
        Cookies.set("memes", JSON.stringify(defaultMemes));
      }
    } else {
      Cookies.set("memes", JSON.stringify(defaultMemes));
    }

    setIsLoaded(true);
  }, []);

  if (!isLoaded) return null;

  return (
    <div className="flex flex-row justify-center h-full p-6 w-full">
      <Table className="w-full max-w-[1280px] table-fixed">
        <TableHeader>
          <TableColumn className="w-[80px]">ID</TableColumn>
          <TableColumn className="w-[250px]">Name</TableColumn>
          <TableColumn className="w-[150px]">Likes</TableColumn>
          <TableColumn className="w-[150px]">Action</TableColumn>
        </TableHeader>
        <TableBody>
          {memes.map((meme) => (
            <TableRow key={meme.id}>
              <TableCell>{meme.id}</TableCell>
              <TableCell className="truncate break-all">{meme.name}</TableCell>
              <TableCell>❤️ {meme.likes}</TableCell>
              <TableCell>
                <Button onPress={() => onOpenModal(meme)}>Edit</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {editing && (
        <MemeModal
          isOpenModal={isOpenModal}
          onClose={closeModal}
          meme={editing}
          onSave={handleUpdate}
        />
      )}
    </div>
  );
}
