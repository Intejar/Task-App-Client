import { Button, Modal } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { FaExclamationTriangle } from "react-icons/fa";
import toast from "react-hot-toast";

const DeleteModal = ({ dlt, refetch, visibleDlt, setVisibleDlt }) => {
  const [info, setInfo] = useState(false);
  if (info) {
    fetch(`https://task-app-server-iota.vercel.app/task/${dlt}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.deletedCount > 0) {
          toast.success("task has been successfully deleted");
          refetch();
        }
      });
  }

  return (
    <Modal
      show={visibleDlt}
      size="md"
      popup={true}
      onClose={() => setVisibleDlt(false)}
    >
      <Modal.Header />
      <Modal.Body>
        <div className="text-center">
          <FaExclamationTriangle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
          <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
            Are you sure you want to delete this product?
          </h3>
          <div className="flex justify-center gap-4">
            <Button color="failure" onClick={() => setInfo(true)}>
              Yes, I'm sure
            </Button>
            <Button color="gray" onClick={() => setInfo(false)}>
              No, cancel
            </Button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default DeleteModal;
