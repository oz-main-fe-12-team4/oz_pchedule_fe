import React, { useState, useRef } from "react";

function DetailScheduleCard({
  title,
  description,
  onChangeTitle,
  onChangeDescription,
}) {
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [isEditingDesc, setIsEditingDesc] = useState(false);
  const [editTitle, setEditTitle] = useState(title);
  const [editDesc, setEditDesc] = useState(description);

  const descInputRef = useRef(null);

  const onTitleKeyDown = (e) => {
    if (e.key === "Enter") {
      setIsEditingTitle(false);
      setIsEditingDesc(true);
      setTimeout(() => {
        descInputRef.current?.focus();
      }, 0);
    }
  };

  const finishTitleEdit = () => {
    setIsEditingTitle(false);
    onChangeTitle(editTitle);
  };

  const finishDescEdit = () => {
    setIsEditingDesc(false);
    onChangeDescription(editDesc);
  };

  return (
    <div
      className="bg-gray-200 rounded-md p-3 ml-4 shadow-sm relative flex flex-col"
      style={{ minWidth: "200px", maxWidth: "90vw", whiteSpace: "nowrap" }}
    >
      {/* 수정 아이콘 */}
      <button
        type="button"
        onClick={() => setIsEditingTitle(true)}
        className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
        aria-label="수정"
        title="수정"
      >
        ✎
      </button>

      {/* 제목 */}
      {isEditingTitle ? (
        <input
          value={editTitle}
          onChange={(e) => setEditTitle(e.target.value)}
          onBlur={finishTitleEdit}
          onKeyDown={onTitleKeyDown}
          className="w-full mb-2 border border-gray-400 rounded px-2 py-1"
          autoFocus
          style={{ whiteSpace: "normal" }}
        />
      ) : (
        <h4
          className="font-bold mb-1 cursor-text inline-block"
          tabIndex={0}
          onClick={() => setIsEditingTitle(true)}
          onKeyDown={(e) => e.key === "Enter" && setIsEditingTitle(true)}
        >
          {editTitle}
        </h4>
      )}

      {/* 내용 */}
      {isEditingDesc ? (
        <textarea
          ref={descInputRef}
          value={editDesc}
          onChange={(e) => setEditDesc(e.target.value)}
          onBlur={finishDescEdit}
          rows={1}
          className="border border-gray-400 rounded px-2 py-1 resize-none"
          style={{ whiteSpace: "normal", overflow: "auto" }}
          autoFocus
        />
      ) : (
        <p
          className="text-sm text-gray-700 cursor-text inline-block overflow-x-auto"
          style={{ whiteSpace: "nowrap" }}
          onClick={() => setIsEditingDesc(true)}
        >
          {editDesc}
        </p>
      )}
    </div>
  );
}

export default DetailScheduleCard;
