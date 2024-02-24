"use client";

import styles from "./index.module.css";
import { MdBookmarkBorder, MdBookmark } from "react-icons/md";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import DropdownMenu from "./DropdownMenu";
import { handleFetchResponse } from "@/app/lib";

const defaultShelf = {
  id: 0,
  isShelved: false,
};

export default function ShelfBtn({ workId }) {
  const [shelf, setShelf] = useState(defaultShelf);
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const shelfBtnRef = useRef(null);
  const shelfName = computeShelfName(shelf.id);

  useEffect(() => {
    fetch("http://localhost:8000/api/v1/u/shelves", {
      credentials: "include",
    })
      .then((res) => handleFetchResponse(res))
      .then((data) => handleData(data, workId))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    // add mousedown event listener to listen to page level events
    document.addEventListener("mousedown", (e) =>
      handleOutsideClick(e, shelfBtnRef, setIsOpen)
    );

    // return a cleaner function to clean the effect once the component unmounts
    return () => {
      document.removeEventListener("mousedown", (e) =>
        handleOutsideClick(e, shelfBtnRef, setIsOpen)
      );
    };
  }, [shelfBtnRef]);

  return (
    <div ref={shelfBtnRef} className={styles.shelfBtn}>
      <div>
        <button
          type="button"
          className={styles.primaryBtn}
          onClick={() => ToggleShelf(shelf, workId)}
        >
          {shelf.isShelved ? <MdBookmark /> : <MdBookmarkBorder />}
          {shelfName}
        </button>
        <span
          className={styles.secondaryBtn}
          onClick={() => setIsOpen((state) => !state)}
        >
          <span className={styles.arrow}></span>
        </span>
      </div>
      {isOpen && (
        <DropdownMenu shelfId={shelf.id} handleSelection={handleSelection} />
      )}
    </div>
  );

  function updateShelves(update) {
    // update = {
    //   type: 'ADD' || 'MOVE' || 'REMOVE',
    //   payload: {
    //    shelfId,
    //    workId,
    //   }
    // }
    let body = {},
      handleSuccess = {};

    // set body and handleSuccess according to update type
    switch (update.type) {
      case "ADD":
        body = {
          targetShelfId: update.payload.shelfId,
          workId: update.payload.workId,
        };
        handleSuccess = (data) => {
          if (data.code === "success") {
            setShelf((state) => ({ ...state, isShelved: true }));
            setIsOpen(false);
          }
        };
        break;

      case "REMOVE":
        body = {
          currentShelfId: update.payload.shelfId,
          workId: update.payload.workId,
        };
        handleSuccess = (data) => {
          if (data.code === "success") {
            setShelf((state) => ({ ...state, isShelved: false }));
            setIsOpen(false);
          }
        };
        break;

      case "MOVE":
        body = {
          currentShelfId: shelf.id,
          targetShelfId: update.payload.shelfId,
          workId: update.payload.workId,
        };
        handleSuccess = (data) => {
          if (data.code === "success") {
            setShelf({ id: update.payload.shelfId, isShelved: true });
            setIsOpen(false);
          }
        };
        break;
    }

    // fetch backend with body set by switch
    fetch("http://localhost:8000/api/v1/u/shelves", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
      credentials: "include",
    })
      .then((res) => handleFetchResponse(res))
      .then((data) => handleSuccess(data))
      .catch((err) => console.log(err));
  }

  function handleSelection(shelfId) {
    updateShelves({
      type: "MOVE",
      payload: { shelfId, workId },
    });
  }
  function ToggleShelf(shelf, workId) {
    if (shelf.isShelved) {
      // remove workId from the shelf
      updateShelves({
        type: "REMOVE",
        payload: { shelfId: shelf.id, workId: workId },
      });
    } else {
      updateShelves({
        type: "ADD",
        payload: { shelfId: shelf.id, workId: workId },
      });
    }
  }

  function handleData(shelves, workId) {
    const { ownerShelfId } = checkShelvesForWork(shelves, workId);

    if (ownerShelfId > -1) {
      // means the work is present in shelf with id as ownerShelfId.
      setShelf({ id: ownerShelfId, isShelved: true });
    }
    return;
  }
}

function checkShelvesForWork(shelves, workId) {
  for (let i = 0; i < 4; i++) {
    const shelf = shelves[i];

    if (shelf.includes(workId)) {
      return { ownerShelfId: i };
    }
  }
  return { ownerShelfId: -1 };
}

function handleOutsideClick(e, ref, setIsOpen) {
  if (ref.current && !ref.current.contains(e.target)) {
    setIsOpen(false);
  }
}
export function computeShelfName(shelfId) {
  let shelfName = "";

  switch (shelfId) {
    case 0:
      shelfName = "To Read";
      break;
    case 1:
      shelfName = "Reading Now";
      break;
    case 2:
      shelfName = "Have Read";
      break;
    case 3:
      shelfName = "Didn't Finish";
      break;
  }

  return shelfName;
}
