"use client";

import { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Button,
  Input,
} from "@heroui/react";
import * as yup from "yup";

const validationSchema = yup.object({
  name: yup.string().required("Name cannot be empty.").min(3).max(100),
  imageUrl: yup
    .string()
    .url("Invalid image URL.")
    .matches(/\.(jpg|jpeg)$/, "Image URL must end with .jpg or .jpeg."),
  likes: yup
    .number()
    .max(100)
    .positive("Likes must be a positive integer.")
    .integer("Likes must be an integer.")
    .required("Likes cannot be empty."),
});

export const MemeModal = ({ isOpenModal, meme, onClose, onSave }) => {
  const [name, setName] = useState(meme.name);
  const [imageUrl, setImageUrl] = useState(meme.imageUrl);
  const [likes, setLikes] = useState(meme.likes);
  const [errors, setErrors] = useState({});

  function handleSave() {
    const memeData = { name, imageUrl, likes: parseInt(likes) };

    validationSchema
      .validate(memeData, { abortEarly: false })
      .then(() => {
        onSave({ ...meme, name, imageUrl, likes: parseInt(likes) });
      })
      .catch((err) => {
        const errorObj = err.inner.reduce((acc, error) => {
          acc[error.path] = error.message;
          return acc;
        }, {});
        setErrors(errorObj);
      });
  }

  return (
    <Modal isOpen={isOpenModal} size={"xl"} onClose={onClose}>
      <ModalContent>
        <ModalHeader className="pl-4 flex items-center justify-center text-white">
          Edit
        </ModalHeader>
        <ModalBody>
          <div className="space-y-4">
            <Input
              size="sm"
              label="Назва"
              value={name}
              variant="bordered"
              onChange={(e) => setName(e.target.value)}
              error={errors.name}
            />
            <Input
              size="sm"
              label="Image URL (.jpg)"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              error={errors.imageUrl}
            />
            <Input
              size="sm"
              label="Лайки"
              value={likes}
              onChange={(e) => setLikes(e.target.value)}
              error={errors.likes}
            />
          </div>
          {errors.imageUrl && (
            <p className="text-red-500 text-sm">{errors.imageUrl}</p>
          )}
          {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
          {errors.likes && (
            <p className="text-red-500 text-sm">{errors.likes}</p>
          )}
        </ModalBody>
        <ModalFooter className={"flex items-center justify-end"}>
          <Button color="primary" onPress={onClose}>
            Close
          </Button>
          <Button color="primary" onPress={handleSave}>
            Save
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
