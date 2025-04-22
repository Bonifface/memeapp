"use client";

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

export default function TablePage() {
  const [memes, setMemes] = useState(null); // ⬅ Спочатку null
  const [editing, setEditing] = useState(null);
  const [isOpenModal, setOpenModal] = useState(false);

  const handleUpdate = (updatedMeme) => {
    const updated = memes.map((m) =>
      m.id === updatedMeme.id ? updatedMeme : m,
    );
    setMemes(updated);
    localStorage.setItem("memes", JSON.stringify(updated));
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
    try {
      const fromStorage = localStorage.getItem("memes");
      if (fromStorage) {
        setMemes(JSON.parse(fromStorage));
      } else {
        localStorage.setItem("memes", JSON.stringify(defaultMemes));
        setMemes(defaultMemes);
      }
    } catch {
      localStorage.setItem("memes", JSON.stringify(defaultMemes));
      setMemes(defaultMemes);
    }
  }, []);

  if (!memes) return null;

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
